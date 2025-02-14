import { Dropzone } from "@repo/ui/components/dropzone";
import { Label } from "@repo/ui/components/label";
import { Select } from "@repo/ui/components/react-select";
import Papa from "papaparse";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FaArrowRightLong } from "react-icons/fa6";

type IImportLeadsProps = {
  className?: string;
};
export type IImportLeadsRef = {
  get: () =>
    | "NO_FILE"
    | "ERROR_MAPPING"
    | {
        leads: Record<string, string>[];
        mapping: Record<string, string>;
      };
};

const fieldsToMap = [
  {
    label: "Email",
    value: "email",
    required: true,
  },
  {
    label: "First name",
    value: "firstName",
  },
  {
    label: "Last name",
    value: "lastName",
  },
];

const ImportLeads = forwardRef<IImportLeadsRef, IImportLeadsProps>(
  ({ className }, ref) => {
    const [headers, setHeaders] = useState([] as string[]);
    const [selectedFile, setSelectedFile] = useState(null as null | File);
    const dataRef = useRef<unknown[]>([]);
    const [error, setError] = useState({} as Record<string, string>);
    const [mapping, setMapping] = useState({} as Record<string, string>);

    const handleFileSelect = (file: File) => {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          setSelectedFile(file);
          dataRef.current = results.data;
          const headers = results.meta.fields;
          setHeaders(headers || []);
        },
        error() {
          alert("Error in csv");
        },
        skipEmptyLines: true,
      });
    };

    const headerOptions = headers.map((header) => ({
      label: header,
      value: header,
    }));

    const getMappedData = () => {
      if (!selectedFile) return "NO_FILE";
      const errors = {} as Record<string, string>;
      for (const field of fieldsToMap) {
        const csvField = mapping[field.value];

        if (field.required && !csvField) {
          errors[field.value] = "Required";
        }
      }

      setError(errors);

      if (Object.keys(errors).length) {
        return "ERROR_MAPPING";
      }

      const leads: Record<string, string>[] = [];

      dataRef.current.forEach((item) => {
        const data = item as Record<string, string>;
        const lead = {} as Record<string, string>;
        for (const field of fieldsToMap) {
          const csvField = mapping[field.value];
          if (!csvField) {
            continue;
          }
          const value = data[csvField];
          if (!value && field.required) {
            return;
          }
          if (value) {
            lead[field.value] = value;
          }
        }
        leads.push(lead);
      });

      return { leads, mapping };
    };

    const handleMappingChange = (key: string, value: string | null) => {
      setMapping(({ ...curr }) => {
        if (value) {
          curr[key] = value;
        } else {
          delete curr[key];
        }
        return curr;
      });
    };

    useImperativeHandle(ref, () => ({
      get: getMappedData,
    }));

    return (
      <div className={className}>
        {!selectedFile && (
          <div className="grid gap-2">
            <Label>Import lead list </Label>
            <Dropzone onFileSelect={handleFileSelect} />
          </div>
        )}
        {selectedFile && (
          <div className="grid grid-cols-[1fr_50px_1fr] items-center gap-2">
            <Label className="col-span-full">Field mapping</Label>
            {fieldsToMap.map((item) => {
              const selectedHeader = mapping[item.value] || null;

              return (
                <React.Fragment key={item.value}>
                  <Label>
                    {item.label} {item.required && <span>*</span>}
                  </Label>
                  <FaArrowRightLong />
                  <Select
                    options={headerOptions}
                    onChange={(value) =>
                      handleMappingChange(item.value, value?.value || null)
                    }
                    error={error[item.value] ? true : false}
                    placeholder="Select CSV field"
                    isClearable
                    value={
                      selectedHeader
                        ? {
                            value: selectedHeader,
                            label: selectedHeader,
                          }
                        : null
                    }
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

export default ImportLeads;
