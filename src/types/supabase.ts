export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      User: {
        Row: {
          id: string
          username: string
          password: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          username: string
          password: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          username?: string
          password?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      DetectedText: {
        Row: {
          id: string
          content: string
          result: Json
          createdAt: string
          updatedAt: string
          userId: string
        }
        Insert: {
          id?: string
          content: string
          result: Json
          createdAt?: string
          updatedAt?: string
          userId: string
        }
        Update: {
          id?: string
          content?: string
          result?: Json
          createdAt?: string
          updatedAt?: string
          userId?: string
        }
      }
    }
  }
}
