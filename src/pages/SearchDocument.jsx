import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";
import "react-datepicker/dist/react-datepicker.css";
import { getTags, searchDocuments } from "../api/documentApi";
import toast from "react-hot-toast";

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
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">

          <h3 className="mb-4">Search Documents</h3>

          <div className="row">

            {/* Category */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>

              <select
                className="form-select"
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
            <div className="col-md-6 mb-3">
              <label className="form-label">Sub Category</label>

              <select
                className="form-select"
                value={minorHead}
                onChange={(e) => setMinorHead(e.target.value)}
                disabled={!majorHead}
              >
                <option value="">Select Sub Category</option>

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

            {/* From Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">From Date</label>

              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                className="form-control"
                dateFormat="dd-MM-yyyy"
                isClearable
              />
            </div>

            {/* To Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">To Date</label>

              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                className="form-control"
                dateFormat="dd-MM-yyyy"
                isClearable
              />
            </div>

            {/* Tags */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Tags</label>

              <CreatableSelect
                isMulti
                options={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
                placeholder="Select Tags"
              />
            </div>

            {/* Search Button */}
            <div className="col-12">
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

          </div>

        </div>
      </div>

      {documents.length > 0 && (
        <div className="card shadow mt-4">
          <div className="card-body">

            <h4 className="mb-3">
              Search Results ({documents.length})
            </h4>

            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

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

                      <td>{doc.document_id}</td>

                      <td>{doc.major_head}</td>

                      <td>{doc.minor_head}</td>

                      <td>
                        {new Date(doc.document_date).toLocaleDateString("en-GB")}
                      </td>

                      <td>{doc.uploaded_by}</td>

                      <td>{doc.document_remarks}</td>

                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handlePreview(doc.file_url)}
                        >
                          Preview
                        </button>

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleDownload(doc.file_url)}
                        >
                          Download
                        </button>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default SearchDocument