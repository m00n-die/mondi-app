import UploadForm from '../components/UploadForm';

function UploadPage() {
  return (
    <div className="upload-page">
      <h1>Upload File</h1>
      <p>Select a file to upload to your secure storage.</p>
      <UploadForm />
    </div>
  );
}

export default UploadPage;