"use server";

export async function saveArt(userId: string, config: any) {
  // Mock save to database
  console.log("Saving art for user", userId, config);

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    slug: `art-${Date.now()}`,
    url: `/gallery/user/demo/${Date.now()}`,
  };
}
