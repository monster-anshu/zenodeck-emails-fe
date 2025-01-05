export const styleString = (style: Record<string, string>) => {
  return (
    `"` +
    Object.entries(style)
      .map(([k, v]) => `${k}:${v}`)
      .join(";") +
    `"`
  );
};

const tableStyle = {
  height: "150px",
  margin: "0 auto 10px auto",
  padding: "5px 5px 5px 5px",
  width: "100%",
};

const tableCellStyle = {
  padding: "0",
  margin: "0",
  "vertical-align": "top",
};

export const SECTION_100 = `
  <table style=${styleString(tableStyle)}>
    <tr>
      <td style=${styleString({ ...tableCellStyle, width: "100%" })}></td>
    </tr>
  </table>
`;

export const SECTION_50 = `
  <table style=${styleString(tableStyle)}>
    <tr>
      <td style=${styleString({ ...tableCellStyle, width: "50%" })}></td>
      <td style=${styleString({ ...tableCellStyle, width: "50%" })}></td>
    </tr>
  </table>
`;

export const SECTION_30 = `
  <table style=${styleString(tableStyle)}>
    <tr>
      <td style=${styleString({ ...tableCellStyle, width: "33.33%" })}></td>
      <td style=${styleString({ ...tableCellStyle, width: "33.33%" })}></td>
      <td style=${styleString({ ...tableCellStyle, width: "33.33%" })}></td>
    </tr>
  </table>
`;

export const SECTION_37 = `
  <table style=${styleString(tableStyle)}>
    <tr>
      <td style=${styleString({ ...tableCellStyle, width: "30%" })}></td>
      <td style=${styleString({ ...tableCellStyle, width: "70%" })}></td>
    </tr>
  </table>
`;

export const SECTION_73 = `
  <table style=${styleString(tableStyle)}>
    <tr>
      <td style=${styleString({ ...tableCellStyle, width: "70%" })}></td>
      <td style=${styleString({ ...tableCellStyle, width: "30%" })}></td>
    </tr>
  </table>
`;

export const BUTTON = `
  <a
    style=${styleString({
      "background-color": "#000000",
      color: "#ffffff",
      padding: "10px 20px 10px 20px",
      "border-radius": "3px",
      "font-size": "12px",
      "text-align": "center",
    })}
  >
    Button
  </a>
`;

export const DIVIDER = `
  <table
    style=${styleString({
      width: "100%",
      "margin-top": "10px",
      "margin-bottom": "10px",
    })}
  >
    <tr>
      <td
        style=${styleString({
          "background-color": "rgba(0, 0, 0, 0.1)",
          height: "1px",
        })}
      ></td>
    </tr>
  </table>
`;

export const TEXT_SECTION = `
  <h1 class='heading'>Insert title here</h1>
  <p class='paragraph'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua
  </p>,
`;

export const QUOTE = `
  <blockquote class='blockquote'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore ipsum dolor sit
  </blockquote>
`;

const GRID_ITEM = `
  <table class='grid-item-card'>
    <tr>
      <td class='grid-item-card-cell'>
        <img
          class='grid-item-image'
          src='https://via.placeholder.com/250x150/78c5d6/fff/'
          alt='Image'
        />
        <table class='grid-item-card-body'>
          <tr>
            <td class='grid-item-card-content'>
              <h1 class='card-title'>Title here</h1>
              <p class='card-text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

export const GRID_ITEMS = `
  <table class='grid-item-row'>
    <tr>
      <td class='grid-item-cell2-l'>${GRID_ITEM}</td>
      <td class='grid-item-cell2-r'>${GRID_ITEM}</td>
    </tr>
  </table>
`;

export const LIST_ITEM = `
  <table class='list-item'>
    <tr>
      <td class='list-item-cell'>
        <table class='list-item-content'>
          <tr class='list-item-row'>
            <td class='list-cell-left'>
              <img
                class='list-item-image'
                src='https://via.placeholder.com/150/78c5d6/fff'
                alt='Image'
              />
            </td>
            <td class='list-cell-right'>
              <h1 class='card-title'>Title here</h1>
              <p class='card-text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;
