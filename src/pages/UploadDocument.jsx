import { useRef, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTags, uploadDocument } from "../api/documentApi";
import toast from "react-hot-toast";

const UploadDocument = () => {
  const [documentDate, setDocumentDate] = useState(new Date());

  const [majorHead, setMajorHead] = useState("");

  const [minorHead, setMinorHead] = useState("");

  const [remarks, setRemarks] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [tagOptions, setTagOptions] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const personalOptions = ["John", "Tom", "Emily"];

  const professionalOptions = [
    "Accounts",
    "HR",
    "IT",
    "Finance",
  ];

  const subCategoryOptions =
    majorHead === "Personal"
      ? personalOptions
      : professionalOptions;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only Image and PDF files are allowed.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const fetchTags = async () => {
    try {
      const response = await getTags("");

      const options = response.data.data.map((tag) => ({
        value: tag.id,
        label: tag.label,
      }));

      setTagOptions(options);
    } catch (error) {
      console.log("Error fetching tags:", error);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!majorHead) {
      toast.error("Please select category");
      return;
    }

    if (!minorHead) {
      toast.error("Please select sub category");
      return;
    }

    if (selectedTags.length === 0) {
      toast.error("Please select at least one tag");
      return;
    }

    if (!remarks.trim()) {
      toast.error("Please enter remarks");
      return;
    }

    if (!selectedFile) {
      toast.error("Please choose a file");
      return;
    }

    try {
      setLoading(true);

      const tags = selectedTags.map((tag) => ({
        tag_name: tag.label,
      }));

      const payload = {
        major_head: majorHead,
        minor_head: minorHead,
        document_date: formatDate(documentDate),
        document_remarks: remarks,
        tags,
        user_id: localStorage.getItem("user_id"),
      };

      const formData = new FormData();

      formData.append("file", selectedFile);

      formData.append("data", JSON.stringify(payload));

      const response = await uploadDocument(formData);

      console.log(response.data);

      toast.success("Document uploaded successfully");

      resetForm();
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDocumentDate(new Date());
    setMajorHead("");
    setMinorHead("");
    setRemarks("");
    setSelectedFile(null);
    setSelectedTags([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">

          <h3 className="mb-4">Upload Document</h3>

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* Document Date */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Document Date
                </label>

                <DatePicker
                  selected={documentDate}
                  onChange={(date) => setDocumentDate(date)}
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                />
              </div>

              {/* Category */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  value={majorHead}
                  onChange={(e) => {
                    setMajorHead(e.target.value);
                    setMinorHead("");
                  }}
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Personal">
                    Personal
                  </option>

                  <option value="Professional">
                    Professional
                  </option>

                </select>
              </div>

              {/* Sub Category */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Sub Category
                </label>

                <select
                  className="form-select"
                  value={minorHead}
                  onChange={(e) =>
                    setMinorHead(e.target.value)
                  }
                  disabled={!majorHead}
                >
                  <option value="">
                    Select Sub Category
                  </option>

                  {subCategoryOptions.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>
              </div>

              {/* Tags */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Tags
                </label>

                <CreatableSelect
                  isMulti
                  options={tagOptions}
                  value={selectedTags}
                  onChange={setSelectedTags}
                  placeholder="Select or Create Tags"
                />
              </div>

              {/* Remarks */}
              <div className="col-12 mb-3">
                <label className="form-label">
                  Remarks
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={remarks}
                  onChange={(e) =>
                    setRemarks(e.target.value)
                  }
                />
              </div>

              {/* File */}
              <div className="col-12 mb-3">
                <label className="form-label">
                  Upload File
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="form-control"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileChange}
                />

                {selectedFile && (
                  <small className="text-success mt-2 d-block">
                    Selected File: {selectedFile.name}
                  </small>
                )}
              </div>

              {/* Upload Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Document"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default UploadDocument;