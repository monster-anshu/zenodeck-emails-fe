import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Dropzone } from "@repo/ui/components/dropzone";
import { Form, FormField, FormItem, FormLabel } from "@repo/ui/components/form";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { FormComponent } from "@repo/ui/molecules/form-component";
import Papa from "papaparse";
import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { z } from "zod";

type ILeadListPageProps = {};

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

const schema = z.object({
  name: z.string().nonempty(),
  mapping: z.record(z.string().optional().or(z.null())),
});

const LeadListPage: FC<ILeadListPageProps> = () => {
  const [headers, setHeaders] = useState([] as string[]);
  const [selectedFile, setSelectedFile] = useState(null as null | File);
  const dataRef = useRef<unknown[]>([]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mapping: {},
    },
  });
  const values = form.watch();

  const handleFileSelect = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        if (results.errors.length) {
          alert("Error in csv");
          return;
        }
        setSelectedFile(file);
        dataRef.current = results.data;
        const headers = results.meta.fields;
        setHeaders(headers || []);
      },
    });
  };

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
    let hasError = false;
    for (const field of fieldsToMap) {
      const key = `mapping.${field.value}` as const;
      const csvField = values.mapping[field.value];

      if (field.required && !csvField) {
        form.setError(key, {
          message: "Required",
          type: "required",
        });
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    const leads: Record<string, string>[] = [];

    dataRef.current.forEach((item) => {
      const data = item as Record<string, string>;
      const lead = {} as Record<string, string>;
      for (const field of fieldsToMap) {
        const csvField = values.mapping[field.value];
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

    console.log(leads);
  }

  const setMapping = (field: string, value: string | null) => {
    const key = `mapping.${field}` as const;
    form.setValue(key, value || undefined);
    form.clearErrors(key);
  };

  return (
    <div>
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create lead list</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit as never)}
                className="grid grid-cols-2 gap-3"
              >
                <FormComponent
                  element={{
                    label: "Name",
                    type: "text",
                    name: "name",
                    placeholder: "User list",
                  }}
                />
                {!selectedFile && (
                  <Dropzone
                    onFileSelect={handleFileSelect}
                    className="col-span-2"
                  />
                )}
                {selectedFile && (
                  <div className="col-span-2">
                    <Label className="col-span-full">Field mapping</Label>
                    {fieldsToMap.map((item) => {
                      const key = `mapping.${item.value}` as const;
                      const selectedHeader = values.mapping[item.value] || "";

                      return (
                        <FormField
                          control={form.control}
                          name={key}
                          key={key}
                          render={() => (
                            <FormItem className="grid grid-cols-[1fr_50px_1fr] items-center gap-2">
                              <FormLabel>
                                {item.label} {item.required && <span>*</span>}
                              </FormLabel>
                              <FaArrowRightLong />
                              <Select
                                value={selectedHeader}
                                onValueChange={(header) =>
                                  setMapping(item.value, header)
                                }
                              >
                                <SelectTrigger
                                  value={selectedHeader}
                                  onReset={() => setMapping(item.value, null)}
                                >
                                  <SelectValue placeholder="Select CSV field" />
                                </SelectTrigger>
                                <SelectContent>
                                  {headers.map((header) => (
                                    <SelectItem value={header} key={header}>
                                      {header}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {/* <FormMessage /> */}
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                )}
                <Button className="col-span-2" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadListPage;
