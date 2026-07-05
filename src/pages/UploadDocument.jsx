import { useRef, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTags, uploadDocument } from "../api/documentApi";
import toast from "react-hot-toast";

/* ── react-select dark theme ─────────────────────────────── */
const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: 'rgba(255,255,255,.05)',
    borderRadius: '12px',
    border: `1.5px solid ${state.isFocused ? '#6366f1' : 'rgba(255,255,255,.1)'}`,
    boxShadow: state.isFocused ? '0 0 0 3px rgba(99,102,241,.15), 0 0 20px rgba(99,102,241,.1)' : 'none',
    minHeight: '46px',
    fontSize: '0.9375rem',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#f1f5f9',
    transition: 'all .2s',
    '&:hover': { borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.07)' },
    cursor: 'text',
  }),
  valueContainer: (base) => ({ ...base, padding: '4px 12px' }),
  input: (base) => ({ ...base, color: '#f1f5f9' }),
  placeholder: (base) => ({ ...base, color: '#475569', fontSize: '0.9375rem' }),
  singleValue: (base) => ({ ...base, color: '#f1f5f9' }),
  menu: (base) => ({
    ...base,
    background: '#1e293b',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,.6)',
    zIndex: 9999,
  }),
  menuList: (base) => ({ ...base, padding: '4px' }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? '#6366f1' : state.isFocused ? 'rgba(99,102,241,.15)' : 'transparent',
    color: state.isSelected ? '#fff' : '#f1f5f9',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '0.9375rem',
    borderRadius: '8px',
    margin: '2px 0',
    cursor: 'pointer',
    transition: 'background .15s',
  }),
  multiValue: (base) => ({
    ...base,
    background: 'rgba(99,102,241,.2)',
    border: '1px solid rgba(99,102,241,.35)',
    borderRadius: '8px',
  }),
  multiValueLabel: (base) => ({ ...base, color: '#a5b4fc', fontWeight: 500 }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#818cf8',
    '&:hover': { background: '#6366f1', color: '#fff', borderRadius: '0 8px 8px 0' },
  }),
  clearIndicator: (base) => ({ ...base, color: '#475569', '&:hover': { color: '#f1f5f9' } }),
  dropdownIndicator: (base) => ({ ...base, color: '#475569', '&:hover': { color: '#f1f5f9' } }),
  indicatorSeparator: (base) => ({ ...base, background: 'rgba(255,255,255,.1)' }),
};

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
    <div className="dms-content">

      <div className="page-header">
        <div className="page-title">Upload Document</div>
        <div className="page-subtitle">Add a new document to the repository</div>
      </div>

      <div className="dms-card" style={{ animation: 'scale-in .4s .05s both' }}>

        <div className="dms-card-header">
          <div className="icon-badge" style={{ background: 'rgba(99,102,241,.15)', border: '1px solid rgba(99,102,241,.25)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <span className="dms-card-title">Document Details</span>
        </div>

        <div className="dms-card-body">

          <form onSubmit={handleSubmit}>

            <div className="section-divider">Classification</div>

            <div className="row-2col">

              {/* Document Date */}
              <div className="dms-field">
                <label className="dms-label">Document Date</label>
                <DatePicker
                  selected={documentDate}
                  onChange={(date) => setDocumentDate(date)}
                  className="dms-input"
                  dateFormat="dd-MM-yyyy"
                  portalId="root"
                  popperProps={{ strategy: 'fixed' }}
                  popperPlacement="bottom-start"
                />
              </div>

              {/* Category */}
              <div className="dms-field">
                <label className="dms-label">Category</label>
                <select
                  className="dms-select"
                  value={majorHead}
                  onChange={(e) => {
                    setMajorHead(e.target.value);
                    setMinorHead("");
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Personal">Personal</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              {/* Sub Category */}
              <div className="dms-field">
                <label className="dms-label">Sub Category</label>
                <select
                  className="dms-select"
                  value={minorHead}
                  onChange={(e) => setMinorHead(e.target.value)}
                  disabled={!majorHead}
                >
                  <option value="">Select Sub Category</option>
                  {subCategoryOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="dms-field">
                <label className="dms-label">Tags</label>
                <CreatableSelect
                  isMulti
                  options={tagOptions}
                  value={selectedTags}
                  onChange={setSelectedTags}
                  placeholder="Select or create tags…"
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>

            </div>

            <div className="section-divider">Content</div>

            {/* Remarks */}
            <div className="dms-field">
              <label className="dms-label">Remarks</label>
              <textarea
                className="dms-textarea"
                rows="3"
                placeholder="Add any notes or remarks about this document…"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* File */}
            <div className="dms-field">
              <label className="dms-label">Upload File</label>

              {/* Custom file drop zone feel */}
              <div
                style={{
                  border: '2px dashed rgba(99,102,241,.3)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color .2s, background .2s',
                  background: selectedFile ? 'rgba(16,185,129,.05)' : 'rgba(99,102,241,.04)',
                  position: 'relative',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(99,102,241,.6)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(99,102,241,.3)'}
                onClick={() => fileInputRef.current?.click()}
              >
                <div style={{ marginBottom: '.5rem', fontSize: '1.5rem' }}>
                  {selectedFile ? '✅' : '📎'}
                </div>
                <div style={{ color: 'var(--text-2)', fontSize: '.875rem', fontWeight: 500 }}>
                  {selectedFile
                    ? selectedFile.name
                    : 'Click to select a file — PDF, PNG, JPG'}
                </div>
                {!selectedFile && (
                  <div style={{ color: 'var(--text-3)', fontSize: '.75rem', marginTop: '.25rem' }}>
                    Max 10MB
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              {selectedFile && (
                <span className="file-chip">
                  ✓ {selectedFile.name}
                </span>
              )}
            </div>

            <hr className="dms-divider" />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                className="dms-btn dms-btn-primary"
                disabled={loading}
              >
                {loading && <span className="dms-spinner" />}
                {loading ? "Uploading…" : "Upload Document"}
              </button>

              <button
                type="button"
                className="dms-btn dms-btn-ghost"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default UploadDocument;