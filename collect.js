// https://jlcpcb.com/parts/1st/Resistors_1
// SELECT BASIC PARTS

all = [];

// COLLECT
col3Els = document.querySelectorAll('tr.el-table__row > td:nth-child(3)');
col5Els = document.querySelectorAll('tr.el-table__row > td:nth-child(5) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)');

// Check if the lengths match
if (col3Els.length === col5Els.length) {
    const pairs = Array.from(col3Els).map((el, index) => {
        col3InnerText = el.innerText;
        col3Href = el.querySelector('a').href;
        return {
            href: col3Href,
            col3: col3InnerText,
            col5: col5Els[index].innerText
        };
    });
    console.log(pairs);
    all = all.concat(pairs);
} else {
    console.error('Mismatch in the number of elements between the two columns.');
}


// DOWNLOAD
const jsonString = JSON.stringify(all, null, 2); // Convert to JSON string with indentation
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.download = 'data.json';
link.click();

URL.revokeObjectURL(url); // Cleanup the object URL
