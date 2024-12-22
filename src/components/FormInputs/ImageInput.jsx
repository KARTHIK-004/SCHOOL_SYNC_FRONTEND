import React from "react";

export default function ImageInput({ title, imageUrl, setImageUrl, endpoint }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        <div className="grid gap-2">
          <img
            alt={title}
            className="h-40 w-full rounded-md object-cover"
            src={imageUrl}
          />
          <div className="col-span-full">
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Create a URL for the uploaded file
                  const fileUrl = URL.createObjectURL(file);
                  setImageUrl(fileUrl);

                  // Optional: Handle actual file upload to a server
                  if (endpoint) {
                    const formData = new FormData();
                    formData.append("file", file);

                    fetch(endpoint, {
                      method: "POST",
                      body: formData,
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log("Upload successful:", data);
                        // If the server returns a URL, you can use that instead
                        if (data.url) {
                          setImageUrl(data.url);
                        }
                      })
                      .catch((error) => {
                        alert(`ERROR! ${error.message}`);
                        console.error("Upload error:", error);
                      });
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
