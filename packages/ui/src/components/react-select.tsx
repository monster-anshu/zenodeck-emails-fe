import { Check, ChevronDown, X } from "lucide-react";
import React, { ReactNode, useId, useMemo } from "react";
import RSelect, { Props, components } from "react-select";

type SelectOptionTypes = "default" | "checkbox";
interface ISelectProps<Option, isMulti extends boolean>
  extends Props<Option, isMulti> {
  error?: ReactNode;
  type?: SelectOptionTypes;
  noBorder?: boolean;
}

export type BasicOption = {
  label: React.ReactNode;
  value: string;
};

const Select = <Option, isMulti extends boolean = false>({
  error,
  isMulti = false as isMulti,
  classNames,
  styles: stylesProps,
  onFocus,
  components: componentsProps,
  menuPlacement,
  type = "default",
  noBorder,
  ...props
}: ISelectProps<Option, isMulti>) => {
  let id = useId();

  if (props.id) {
    id = props.id;
  }

  const OptionComponent = useMemo(() => {
    if (type == "checkbox") {
      return CheckboxComponent;
    }
    return DefaultOptionComponent;
  }, [type]);

  return (
    <RSelect
      {...props}
      isMulti={isMulti}
      classNames={{
        control: () => "!shadow-none text-sm py-0",
        menu: () =>
          "text-sm !overflow-hidden !border !my-1 !p-1 !rounded-md !shadow-md",
        option: () => "text-sm !cursor-pointer",
        dropdownIndicator: () => "!py-0",
        input: () => "!py-0 !my-0 !text-foreground",
        multiValue: () => "!px-0 !my-0 !bg-accent",
        multiValueRemove: () => "!bg-transparent !text-accent-foreground",
        ...classNames,
      }}
      loadingMessage={() => <p>loading</p>}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "hsl(var(--accent) / 1)",
          primary25: "hsl(var(--accent) / 1)",
          primary50: "hsl(var(--accent) / 1)",
          primary75: "hsl(var(--accent) / 1)",
          danger: "hsl(var(--destructive))",
        },
      })}
      styles={{
        control: (provided, props) => ({
          ...provided,
          border: noBorder ? "none" : provided.border,
          borderColor: error
            ? "hsl(var(--destructive)) !important"
            : "hsl(var(--border)) !important",
          outline:
            props.isFocused && !noBorder
              ? "1px solid  hsl(var(--ring))"
              : "none",
          background: "transparent",
          minHeight: 36,
        }),
        container: (provided) => ({
          ...provided,
          width: "100%",
          cursor: "pointer",
        }),
        option: (provided, props) => ({
          ...provided,
          color: props.isFocused
            ? "hsl(var(--accent-foreground))"
            : "hsl(var(--popover-foreground))",
          background: props.isFocused
            ? "hsl(var(--accent))"
            : "hsl(var(--popover))",
        }),
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 100,
        }),
        menu: (provided) => ({
          ...provided,
          background: "hsl(var(--popover))",
        }),
        menuList: (provided) => ({
          ...provided,
          padding: 0,
          margin: 0,
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          background: "transparent",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "var(--foreground)",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "hsl(var(--accent-foreground))",
        }),
        placeholder: (provided, props) => ({
          ...provided,
          color: error ? props.theme.colors.danger : provided.color,
        }),

        ...stylesProps,
      }}
      components={{
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
        DropdownIndicator: (props) => (
          <button
            type="button"
            className={`px-2 ${error ? "text-destructive" : ""}`}
            onClick={() => {
              if (props.hasValue) {
                props.clearValue();
              }
            }}
          >
            {props.hasValue ? (
              <X className="h-4 w-4 opacity-50" />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-50" />
            )}
          </button>
        ),
        Option: OptionComponent as never,
        ...componentsProps,
      }}
      onFocus={(e) => {
        if (!props.name) return;
        e.target.name = props.name;
        onFocus?.(e);
      }}
      menuPlacement={menuPlacement || "auto"}
      menuPosition="fixed"
      menuPortalTarget={typeof window === "undefined" ? null : document.body}
      id={id}
    />
  );
};

export { Select };

const CheckboxComponent = (
  props: React.ComponentProps<typeof components.Option>
) => {
  return (
    <components.Option
      {...props}
      className={"mb-0.5 !flex items-center justify-start gap-2 rounded-sm"}
    >
      <input
        type="checkbox"
        className="accent-accent"
        checked={props.isSelected}
      />
      <label className="cursor-pointer">{props.label}</label>
    </components.Option>
  );
};

const DefaultOptionComponent = (
  props: React.ComponentProps<typeof components.Option>
) => {
  return (
    <components.Option
      {...props}
      className="mb-0.5 !flex items-center justify-between gap-2 rounded-sm"
    >
      <span>{props.label}</span>
      <span>{props.isSelected ? <Check className="h-4 w-4" /> : null}</span>
    </components.Option>
  );
};
