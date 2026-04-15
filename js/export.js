function exportPDF(){
  window.print();
}

function exportExcel(){
  let data = JSON.parse(localStorage.getItem("tableData"));
  let csv = "SlNo,Date,Tag,Location,Status,Remarks,Shift\n";

  data.forEach((r,i)=>{
    csv += `${i+1},${r.date},${r.tag},${r.location},${r.status},${r.remarks},${r.shift}\n`;
  });

  let blob = new Blob([csv], { type: 'text/csv' });
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "data.csv";
  a.click();
}
