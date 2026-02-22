export interface TeamMember {
  id: string;
  user_id: string;
  display_name: string;
  role: string;
  bio?: string | null;
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
