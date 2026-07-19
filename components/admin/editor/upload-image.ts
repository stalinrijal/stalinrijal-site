export async function uploadImage(file: File, bucket: "blog-images" | "blog-covers" = "blog-images"): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Upload failed");
  }

  const { url } = await res.json();
  return url as string;
}
