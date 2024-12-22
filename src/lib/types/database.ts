// types/user.ts
export type UserRole = 'admin' | 'editor' | 'user'

export interface Profile {
  id: string
  username: string
  role: UserRole
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}
  
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile
                Insert: Omit<Profile, 'created_at' | 'updated_at'>
                Update: Partial<Omit<Profile, 'id'>>
            }
        }
    }
}