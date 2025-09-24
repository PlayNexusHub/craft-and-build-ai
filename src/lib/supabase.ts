import { createClient } from '@supabase/supabase-js';

// Get environment variables from Supabase integration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('PlayNexus AI Creator: Supabase credentials not found. Authentication features will be disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database schema types
export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  code: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'in-progress' | 'completed';
  ai_model_used?: string;
  is_local?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  preferred_ai_mode: 'local' | 'cloud';
  created_at: string;
  updated_at: string;
}

// Auth helpers
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('PlayNexus Auth Error:', error);
    return null;
  }
  return user;
};

export const signUp = async (email: string, password: string, fullName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  if (error) {
    console.error('PlayNexus Sign Up Error:', error);
    throw error;
  }
  
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('PlayNexus Sign In Error:', error);
    throw error;
  }
  
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('PlayNexus Sign Out Error:', error);
    throw error;
  }
};

// Project management functions
export const saveProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User must be authenticated to save projects');
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([{ ...project, user_id: user.id }])
    .select()
    .single();

  if (error) {
    console.error('PlayNexus Save Project Error:', error);
    throw error;
  }

  return data;
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User must be authenticated to update projects');
  }

  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('PlayNexus Update Project Error:', error);
    throw error;
  }

  return data;
};

export const getUserProjects = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('PlayNexus Get Projects Error:', error);
    throw error;
  }

  return data || [];
};

export const deleteProject = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User must be authenticated to delete projects');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('PlayNexus Delete Project Error:', error);
    throw error;
  }
};

// User profile functions
export const getUserProfile = async (): Promise<UserProfile | null> => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') { // Not found error
    console.error('PlayNexus Get Profile Error:', error);
    throw error;
  }

  return data || null;
};

export const updateUserProfile = async (updates: Partial<UserProfile>) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User must be authenticated to update profile');
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      id: user.id,
      email: user.email!,
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('PlayNexus Update Profile Error:', error);
    throw error;
  }

  return data;
};