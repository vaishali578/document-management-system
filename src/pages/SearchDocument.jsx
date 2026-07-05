import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";
import "react-datepicker/dist/react-datepicker.css";
import { getTags, searchDocuments } from "../api/documentApi";
import toast from "react-hot-toast";

/* ── react-select dark theme ─────────────────────────────── */
const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: 'rgba(255,255,255,.05)',
    borderRadius: '12px',
    border: `1.5px solid ${state.isFocused ? '#6366f1' : 'rgba(255,255,255,.1)'}`,
    boxShadow: state.isFocused ? '0 0 0 3px rgba(99,102,241,.15)' : 'none',
    minHeight: '46px',
    fontSize: '0.9375rem',
    fontFamily: 'Inter, system-ui, sans-serif',
    transition: 'all .2s',
    '&:hover': { borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.07)' },
  }),
  valueContainer: (base) => ({ ...base, padding: '4px 12px' }),
  input: (base) => ({ ...base, color: '#f1f5f9' }),
  placeholder: (base) => ({ ...base, color: '#475569' }),
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

const SearchDocument = () => {
  const [majorHead, setMajorHead] = useState("");

  const [minorHead, setMinorHead] = useState("");

  const [fromDate, setFromDate] = useState(null);

  const [toDate, setToDate] = useState(null);

  const [selectedTags, setSelectedTags] = useState([]);

  const [tagOptions, setTagOptions] = useState([]);

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(false);

  const personalOptions = ["John", "Tom", "Emily"];

  useEffect(() => {
    fetchTags();
  }, []);

  const professionalOptions = [
    "Accounts",
    "HR",
    "IT",
    "Finance",
  ];

  const subCategoryOptions =
    majorHead === "Personal"
      ? personalOptions
      : majorHead === "Professional"
        ? professionalOptions
        : [];

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
    if (!date) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handlePreview = (url) => {
    window.open(url, "_blank");
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");

    link.href = url;
    link.target = "_blank";

    link.setAttribute("download", "");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const handleSearch = async () => {
    const payload = {
      major_head: majorHead,
      minor_head: minorHead,
      from_date: formatDate(fromDate),
      to_date: formatDate(toDate),

      tags: selectedTags.map((tag) => ({
        tag_name: tag.label,
      })),

      uploaded_by: "",
      start: 0,
      length: 10,
      filterId: "",
      search: {
        value: "",
      },
    };

    try {
      setLoading(true);

      const response = await searchDocuments(payload);
      console.log(response.data.data[0].file_url);

      console.log(response.data);

      setDocuments(response.data.data);

      toast.success("Documents fetched successfully");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to fetch documents"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dms-content">

      <div className="page-header">
        <div className="page-title">Search Documents</div>
        <div className="page-subtitle">Filter by category, date range, or tags</div>
      </div>

      {/* Filter card */}
      <div className="dms-card" style={{ marginBottom: '1.5rem', animation: 'scale-in .4s .05s both' }}>

        <div className="dms-card-header">
          <div className="icon-badge" style={{ background: 'rgba(16,185,129,.12)', border: '1px solid rgba(16,185,129,.25)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <span className="dms-card-title">Search Filters</span>
        </div>

        <div className="dms-card-body">

          <div className="row-2col">

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
                <option value="">All Categories</option>
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
                <option value="">All Sub Categories</option>
                {subCategoryOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div className="dms-field">
              <label className="dms-label">From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                className="dms-input"
                dateFormat="dd-MM-yyyy"
                isClearable
                placeholderText="Select start date"
                portalId="root"
                popperProps={{ strategy: 'fixed' }}
                popperPlacement="bottom-start"
              />
            </div>

            {/* To Date */}
            <div className="dms-field">
              <label className="dms-label">To Date</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                className="dms-input"
                dateFormat="dd-MM-yyyy"
                isClearable
                placeholderText="Select end date"
                portalId="root"
                popperProps={{ strategy: 'fixed' }}
                popperPlacement="bottom-start"
              />
            </div>

          </div>

          {/* Tags */}
          <div className="dms-field">
            <label className="dms-label">Tags</label>
            <CreatableSelect
              isMulti
              options={tagOptions}
              value={selectedTags}
              onChange={setSelectedTags}
              placeholder="Filter by tags…"
              styles={selectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>

          <hr className="dms-divider" />

          <button
            className="dms-btn dms-btn-primary"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <><span className="dms-spinner" /> Searching…</>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Search Documents
              </>
            )}
          </button>

        </div>
      </div>

      {/* Results */}
      {documents.length > 0 && (
        <div className="dms-card" style={{ animation: 'slide-up .4s both' }}>

          <div className="dms-card-header flex items-center justify-between">
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <div className="icon-badge" style={{ background: 'rgba(99,102,241,.15)', border: '1px solid rgba(99,102,241,.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </div>
              <span className="dms-card-title">
                Results
                <span className="results-badge">{documents.length}</span>
              </span>
            </div>
          </div>

          <div className="dms-table-wrap">
            <table className="dms-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Date</th>
                  <th>Uploaded By</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.document_id}>

                    <td>
                      <span style={{
                        fontWeight: 600,
                        color: 'var(--accent)',
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: '.8125rem',
                      }}>
                        #{doc.document_id}
                      </span>
                    </td>

                    <td>
                      <span style={{
                        background: 'rgba(99,102,241,.12)',
                        border: '1px solid rgba(99,102,241,.2)',
                        color: '#a5b4fc',
                        padding: '.2rem .6rem',
                        borderRadius: '99px',
                        fontSize: '.75rem',
                        fontWeight: 600,
                      }}>
                        {doc.major_head}
                      </span>
                    </td>

                    <td style={{ color: 'var(--text-2)' }}>{doc.minor_head}</td>

                    <td style={{ whiteSpace: 'nowrap', color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums' }}>
                      {new Date(doc.document_date).toLocaleDateString("en-GB")}
                    </td>

                    <td style={{ color: 'var(--text-2)' }}>{doc.uploaded_by}</td>

                    <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-2)' }}>
                      {doc.document_remarks}
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'nowrap' }}>
                        <button
                          className="dms-btn dms-btn-outline dms-btn-sm"
                          onClick={() => handlePreview(doc.file_url)}
                        >
                          Preview
                        </button>

                        <button
                          className="dms-btn dms-btn-success dms-btn-sm"
                          onClick={() => handleDownload(doc.file_url)}
                        >
                          ↓ Download
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};

export default SearchDocument;