/**
 * Project management hook with Supabase integration
 * Handles CRUD operations for projects with proper error handling
 * @module hooks/useProjects
 */

import { useState, useCallback, useEffect } from "react";
import { Project } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { validate, projectSchema } from "@/lib/validation";

interface UseProjectsReturn {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: Error | null;
  createProject: (name: string, description?: string) => Promise<Project | null>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  selectProject: (id: string) => void;
  refreshProjects: () => Promise<void>;
}

/**
 * Hook for managing project state and operations
 * @returns Project state and operations
 */
export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetches all projects for the current user
   */
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Add user authentication and filter by userId
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });

      if (fetchError) throw fetchError;

      const mappedProjects: Project[] = (data || []).map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description || "",
        status: p.status || "draft",
        userId: p.user_id,
        createdAt: new Date(p.created_at),
        updatedAt: new Date(p.updated_at),
        lastGenerated: p.last_generated ? new Date(p.last_generated) : undefined,
        metadata: p.metadata,
      }));

      setProjects(mappedProjects);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch projects");
      setError(error);
      toast({
        variant: "destructive",
        title: "Error Loading Projects",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Creates a new project with validation
   */
  const createProject = useCallback(
    async (name: string, description?: string): Promise<Project | null> => {
      setError(null);

      // Validate input
      const validation = validate(projectSchema, { name, description });
      
      // TypeScript discriminated union - must check success explicitly
      if (validation.success === false) {
        const errorMsg = validation.errors.join(", ");
        toast({
          variant: "destructive",
          title: "Invalid Project Data",
          description: errorMsg,
        });
        return null;
      }

      // Now TypeScript knows validation.data exists
      const validatedData = validation.data;
      setIsLoading(true);

      try {
        const now = new Date().toISOString();
        const { data, error: insertError } = await supabase
          .from("projects")
          .insert({
            name: validatedData.name || "",
            description: validatedData.description || "",
            status: "draft",
            created_at: now,
            updated_at: now,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        const newProject: Project = {
          id: data.id,
          name: data.name,
          description: data.description,
          status: data.status,
          userId: data.user_id,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setProjects((prev) => [newProject, ...prev]);
        setCurrentProject(newProject);

        toast({
          title: "Project Created",
          description: `"${newProject.name}" has been created successfully.`,
        });

        return newProject;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to create project");
        setError(error);
        toast({
          variant: "destructive",
          title: "Error Creating Project",
          description: error.message,
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Updates an existing project
   */
  const updateProject = useCallback(
    async (id: string, updates: Partial<Project>): Promise<boolean> => {
      setError(null);
      setIsLoading(true);

      try {
        const { error: updateError } = await supabase
          .from("projects")
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);

        if (updateError) throw updateError;

        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p))
        );

        if (currentProject?.id === id) {
          setCurrentProject((prev) =>
            prev ? { ...prev, ...updates, updatedAt: new Date() } : null
          );
        }

        toast({
          title: "Project Updated",
          description: "Your changes have been saved.",
        });

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to update project");
        setError(error);
        toast({
          variant: "destructive",
          title: "Error Updating Project",
          description: error.message,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [currentProject]
  );

  /**
   * Deletes a project
   */
  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);

      if (deleteError) throw deleteError;

      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (currentProject?.id === id) {
        setCurrentProject(null);
      }

      toast({
        title: "Project Deleted",
        description: "The project has been permanently deleted.",
      });

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete project");
      setError(error);
      toast({
        variant: "destructive",
        title: "Error Deleting Project",
        description: error.message,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentProject]);

  /**
   * Selects a project as the current active project
   */
  const selectProject = useCallback(
    (id: string) => {
      const project = projects.find((p) => p.id === id);
      if (project) {
        setCurrentProject(project);
      }
    },
    [projects]
  );

  /**
   * Refreshes the project list
   */
  const refreshProjects = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  // Load projects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    currentProject,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
    selectProject,
    refreshProjects,
  };
};
