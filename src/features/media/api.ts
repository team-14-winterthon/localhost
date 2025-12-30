export const mediaApi = {
  async uploadImage(file: File): Promise<string> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return mock URL (in production, this would upload to cloud storage)
    return URL.createObjectURL(file)
  },
}
