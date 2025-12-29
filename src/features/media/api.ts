import { supabase } from '@/shared/api/supabase'

export const mediaApi = {
  async uploadImage(file: File, bucket: string = 'photos'): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return urlData.publicUrl
  },
}
