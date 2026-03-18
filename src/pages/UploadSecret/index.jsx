import { useState } from "react";
import { hiddenUploadTrack } from "../../services/track.service";

const initialForm = {
  title: "",
  artist: "",
  playlistId: "",
  audio: null,
};

function UploadSecretPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedTrack, setUploadedTrack] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, audio: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title || !form.artist || !form.audio) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("artist", form.artist);
      if (form.playlistId) {
        payload.append("playlistId", form.playlistId);
      }
      payload.append("audio", form.audio);

      const data = await hiddenUploadTrack(payload);
      setUploadedTrack(data);
      setForm(initialForm);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h2>Upload bài hát (URL ẩn)</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          name="title"
          placeholder="Tên bài hát"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="artist"
          placeholder="Nghệ sĩ"
          value={form.artist}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="playlistId"
          placeholder="Playlist ID (không bắt buộc)"
          value={form.playlistId}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang upload..." : "Upload"}
        </button>
      </form>

      {uploadedTrack && (
        <div style={{ marginTop: 16 }}>
          <p>Upload thành công: {uploadedTrack.title}</p>
          <a href={`http://localhost:5000${uploadedTrack.audioUrl}`} target="_blank" rel="noreferrer">
            Mở file nhạc
          </a>
        </div>
      )}
    </div>
  );
}

export default UploadSecretPage;
