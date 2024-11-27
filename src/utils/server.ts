"use server";

const _URL =
  "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/b447e221-cc57-4f0e-af24-992696ed72b0/v1/recognize";

const base64ToBlob = (base64: string, contentType: string): Blob => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

export const sendAudio = async (audioBase64: string, contentType: string) => {
  try {
    const audioBlob = base64ToBlob(audioBase64, contentType);
    const fileStream = await fetch(URL.createObjectURL(audioBlob));

    const response = await fetch(_URL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`apikey:${process.env.IBM_API_KEY}`),
      },
      body: await fileStream.blob(),
    });
    console.log("response: ", response);

    const result = await response.json();
    console.log("result: ", result);

    if (response.ok) {
      console.log("Audio sent successfully!");
      return result;
    } else {
      console.error("Failed to send audio:", response.statusText);
      return { error: response.statusText };
    }
  } catch (error) {
    console.error("Error sending audio:", error);
    return { error };
  }
};
