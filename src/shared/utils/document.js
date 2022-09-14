import { jsPDF } from "jspdf";
import { HELPER_FORMATNUMBER } from "./helpers";
import moment from "moment";
import "jspdf-autotable";

moment.locale("id");

const isBoldOpen = (arrayLength, valueBefore = false) => {
  const isEven = arrayLength % 2 === 0;
  const result = valueBefore !== isEven;

  return result;
};

export const generateHistoryPayment = (data) => {
  let body = [];
  let bodyTwo = [];
  let totalHari = 0;
  let totalDendaCalc = 0;
  let totalDendaRecv = 0;
  let totalAngsuran = 0;

  data.forEach((d, index) => {
    // let tglDue = !d.instlDate || d.instlDate === "" ? "" : moment(d.instlDate);

    // let tglPaid =
    //   !d.refDatetime || d.refDatetime === "" ? "" : moment(d.refDatetime);
    let listData = [
      index + 1,
      !d.instlDate || d.instlDate === ""
        ? ""
        : moment(d.instlDate).format("DD-MMM-YYYY"),
      !d.transDatetime || d.transDatetime === ""
        ? ""
        : moment(d.transDatetime).format("DD-MMM-YYYY"),
      !d.refDatetime || d.refDatetime === ""
        ? ""
        : moment(d.refDatetime).format("DD-MMM-YYYY"),
      d.newOd,
      d.refNo,
      d.kolektor,
      HELPER_FORMATNUMBER(d.angsuran),
      d.isPaid,
      HELPER_FORMATNUMBER(d.pnltCalc),
      HELPER_FORMATNUMBER(d.pnltPaid),
      // d.pdcNo,
      d.bankName,
      d.userId,
    ];
    bodyTwo.push(listData);

    totalHari = totalHari + Number(d.newOd);
    totalDendaCalc = totalDendaCalc + Number(d.pnltCalc);
    totalDendaRecv = totalDendaRecv + Number(d.pnltPaid);
    totalAngsuran = totalAngsuran + Number(d.angsuran);

    let history = {
      ke: index + 1,
      tglDue:
        !d.instlDate || d.instlDate === ""
          ? ""
          : moment(d.instlDate).format("DD-MMM-YYYY"),
      tglPaid:
        !d.transDatetime || d.transDatetime === ""
          ? ""
          : moment(d.transDatetime).format("DD-MMM-YYYY"),
      tglKoleksi:
        !d.refDatetime || d.refDatetime === ""
          ? ""
          : moment(d.refDatetime).format("DD-MMM-YYYY"),
      hari: d.newOd, //tglPaid === "" ? "" : tglPaid.diff(tglDue, "days"),
      noReff: d.refNo,
      kolektor: d.kolektor,
      angsuran: HELPER_FORMATNUMBER(d.angsuran),
      ket: d.isPaid,
      dendaCalc: HELPER_FORMATNUMBER(d.pnltCalc),
      dendaPaid: HELPER_FORMATNUMBER(d.pnltPaid),
      // pdcNo: d.pdcNo,
      pdcNo: d.bankName,
      userId: d.userId,
    };
    body.push(history);
  });

  let doc = new jsPDF("l", "mm", [297, 210]);

  doc.setFont("times");

  doc.setFontSize(14);
  doc.text("HISTORY PEMBAYARAN", doc.internal.pageSize.getWidth() / 2, 20, {
    align: "center",
  });

  // BAGIAN KIRI I
  // nomor kontrak
  doc.setFontSize(10);
  doc.text("Nomor Kontrak", 10, 40);
  doc.text(":", 40, 40);
  doc.text(data[0].noKontrak, 42, 40);

  // nama nasabah
  doc.setFontSize(10);
  doc.text("Nama Nasabah", 10, 48);
  doc.text(":", 40, 48);
  let custNameText = doc.splitTextToSize(data[0].custName, 60);
  doc.text(custNameText, 42, 48);

  // BAGIAN KANAN I
  // deposit
  // let depositAmtText = HELPER_FORMATNUMBER(
  //   data.reduce(function(total, curr) {
  //     return Number(total) + Number(curr.depositAmt);
  //   }, 0)
  // );
  let depositAmtText = HELPER_FORMATNUMBER(data.totDeposito);
  let tertunggakAmtText = HELPER_FORMATNUMBER(data.unpaidTransactFee);
  let bpkbAmtText = HELPER_FORMATNUMBER(data[0].biayaBpkb);

  doc.setFontSize(10);
  doc.text("Total Deposit", 105, 40);
  doc.text(":", 126, 40);
  doc.text(depositAmtText.toString(), 128, 40);

  // kendaraan
  doc.setFontSize(10);
  doc.text("Kendaraan", 105, 48);
  doc.text(":", 122, 48);
  let kendaraanText = doc.splitTextToSize(
    `${data[0].obbrDesc}-${data[0].obmoDesc}`,
    40
  );
  doc.text(124, 48, kendaraanText);

  // alamat
  doc.setFontSize(10);
  doc.text("Alamat KTP", 10, 58);
  doc.text(":", 40, 58);
  let alamatKtpText = doc.splitTextToSize(data[0].alamatKtp, 120);
  doc.text(42, 58, alamatKtpText);

  doc.setFontSize(10);
  doc.text("Alamat Tagih", 10, 70);
  doc.text(":", 40, 70);
  let alamatTagihText = doc.splitTextToSize(data[0].alamatTagih, 120);
  doc.text(42, 70, alamatTagihText);

  doc.setFontSize(10);
  doc.text("Alamat Lain", 10, 82);
  doc.text(":", 40, 82);
  let alamatLainText = doc.splitTextToSize(data[0].alamatLain, 120);
  doc.text(42, 82, alamatLainText);

  // BAGIAN KIRI II
  // no rangka
  doc.setFontSize(10);
  doc.text("Nomor Rangka", 168, 40);
  doc.text(":", 190, 40);
  doc.text(data[0].objtFramNo, 192, 40);

  // no mesin
  doc.setFontSize(10);
  doc.text("No. Mesin", 168, 48);
  doc.text(":", 190, 48);
  doc.text(data[0].objtEngNo, 192, 48);

  // kolektor
  doc.setFontSize(10);
  doc.text("Kolektor", 168, 56);
  doc.text(":", 190, 56);
  doc.text(data[0].kolektorUmum, 192, 56);

  // cara bayar
  doc.setFontSize(10);
  doc.text("Cara Bayar", 168, 64);
  doc.text(":", 190, 64);
  doc.text(data[0].paymTypeDesc, 192, 64);

  // biaya tertunggak
  doc.setFontSize(10);
  doc.text("Biaya Tertunggak", 168, 72);
  doc.text(":", 200, 72);
  doc.text(tertunggakAmtText.toString(), 202, 72);

  // biaya simpan bpkb
  doc.setFontSize(10);
  doc.text("Biaya Simpan BPKB", 168, 80);
  doc.text(":", 200, 80);
  doc.text(bpkbAmtText.toString(), 202, 80);


  //BAGIAN KANAN II
  // tenor
  doc.setFontSize(10);
  doc.text("Tenor", 232, 40);
  doc.text(":", 247, 40);
  doc.text(data[0].arecTop, 249, 40);

  // no polisi
  doc.setFontSize(10);
  doc.text("No. Polisi", 232, 48);
  doc.text(":", 247, 48);
  doc.text(data[0].objtPoliceNo, 249, 48);

  // printed
  // let datePrintedText = new Date().toLocaleString("id-ID", {
  //   dateStyle: "long",
  //   timeStyle: "short",
  // });
  let datePrintedText = moment(new Date()).format("DD MMMM YYYY HH mm");

  doc.setFontSize(10);
  doc.text("Printed", 232, 64);
  doc.text(":", 247, 64);
  doc.text(datePrintedText, 249, 64);

  bodyTwo.push([
    { content: `Total`, colSpan: 4 },
    { content: totalHari.toString(), colSpan: 1 },
    { content: "", colSpan: 2 },
    { content: HELPER_FORMATNUMBER(totalAngsuran).toString(), colSpan: 1 },
    { content: "", colSpan: 1 },
    { content: HELPER_FORMATNUMBER(totalDendaCalc).toString(), colSpan: 1 },
    { content: HELPER_FORMATNUMBER(totalDendaRecv).toString(), colSpan: 1 },
    { content: "", colSpan: 2 },
  ]);

  doc.setFontSize(10);
  doc.autoTable({
    styles: {
      theme: "grid",
      halign: "right",
      lineWidth: 0.3,
      lineColor: [0, 0, 0],
    },
    // columnStyles: { 0: { fillColor: [0, 0, 0] } },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.3,
      lineColor: [0, 0, 0],
      halign: "center",
    },
    // tableLineColor: [0, 0, 0],
    // tableLineWidth: 0.3,
    // theme: "grid",
    head: [
      [
        "Ke",
        "Tanggal Due",
        "Tanggal Paid",
        "Tanggal Koleksi",
        "Hari",
        "No. Ref.",
        "Kolektor",
        "Angsuran",
        "Ket.",
        "Denda Calc",
        "Denda Paid",
        "No. PDC",
        "User Id",
      ],
    ],
    body: bodyTwo,
    startY: 92,
  });
  // doc.autoTable({
  //   styles: { theme: "plain", halign: "right" },
  //   theme: "plain",
  //   body: body,
  //   startY: 92,
  //   columns: [
  //     { header: "Ke", dataKey: "ke" },
  //     { header: "Tanggal Due", dataKey: "tglDue" },
  //     { header: "Tanggal Paid", dataKey: "tglPaid" },
  //     { header: "Tanggal Koleksi", dataKey: "tglKoleksi" },
  //     { header: "Hari", dataKey: "hari" },
  //     { header: "No. Ref.", dataKey: "noReff" },
  //     { header: "Kolektor", dataKey: "kolektor" },
  //     { header: "Angsuran", dataKey: "angsuran" },
  //     { header: "Ket.", dataKey: "ket" },
  //     { header: "Denda Calc", dataKey: "dendaCalc" },
  //     { header: "Denda Paid", dataKey: "dendaPaid" },
  //     { header: "No. PDC.", dataKey: "pdcNo" },
  //     { header: "UserId", dataKey: "userId" },
  //   ],
  //   // showFoot: "lastPage",
  // });

  doc.save(`HistoryPembayaran-${data[0].noKontrak}.pdf`);
};

export const generateDocumentSK = (payload) => {
  let doc = new jsPDF();

  if (payload.flagresponse === "1") {
    doc.setFont("times");

    // doc.setFontSize(14);
    // doc.text("SURAT KETERANGAN", doc.internal.pageSize.getWidth() / 2, 20, {
    //   align: "center",
    // });

    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text(`${payload.docdate}`, 190, 35, { align: "right" });

    doc.text("Nomor", 20, 50);
    doc.text(":", 50, 50);
    doc.text(`${payload.docnum}`, 55, 50);
    doc.text("Perihal", 20, 56);
    doc.text(":", 50, 56);
    doc.text("Surat Keterangan Lancar", 55, 56);

    doc.setFont("times", "normal");
    doc.text("Kepada Yth,", 20, 70);
    doc.text("Bapak/Ibu/Sdr/sdri", 20, 76);
    doc.text(`${payload.name}`, 20, 82);

    let alamatHeader = doc.splitTextToSize(payload.alamat, 170);
    doc.text(alamatHeader, 20, 88);

    doc.text("Dengan ini menerangkan hal-hal sebagai berikut :", 20, 108);
    doc.text("Nama", 20, 114);
    doc.text(":", 70, 114);
    doc.text(`${payload.name}`, 75, 114);

    doc.text("Alamat", 20, 122);
    doc.text(":", 70, 122);
    
    let alamatBody = doc.splitTextToSize(payload.alamat, 120);
    doc.text(alamatBody, 75, 122);

    doc.text("No perjanjian pembiayaan", 20, 138);
    doc.text(":", 70, 138);
    doc.text(`${payload.contno}`, 75, 138);

    doc.text("Tanggal perjanjian", 20, 146);
    doc.text(":", 70, 146);
    doc.text(`${payload.contppddate}`, 75, 146);

    let textDesc = `Berdasarkan History Pembayaran Debitur/Konsumen yang ada pada PT Adira Dinamika Multi Finance Tbk per tanggal ${payload.contpaymentdate}, maka Debitur/Konsumen dengan ini dinyatakan sebagai Debitur/Konsumen dengan status pembayaran **LANCAR**.`;

    let startX = 20;
    let startY = 154;
    // const fontSize = 10;
    const lineSpacing = 6;

    let textTab = doc.splitTextToSize(textDesc, 180, { textIndent: 20 });

    const startXCached = startX;
    let boldOpen = false;

    textTab.map((text) => {
      if (text) {
        const arrayOfNormalAndBoldText = text.split("**");
        const boldStr = "bold";
        const normalOr = "normal";
        arrayOfNormalAndBoldText.map((textItems, j) => {
          doc.setFont("times", boldOpen ? normalOr : boldStr);
          if (j % 2 === 0) {
            doc.setFont("times", boldOpen ? boldStr : normalOr);
          }
          doc.text(textItems, startX, startY);
          startX = startX + doc.getTextWidth(textItems);
        });
        boldOpen = isBoldOpen(arrayOfNormalAndBoldText.length, boldOpen);

        startX = startXCached;
        startY += lineSpacing;
      }
    });

    // doc.text(20, 154, textTab);
    doc.setFont("times", "normal");

    let text2 = `Demikian surat Keterangan ini dibuat dan berlaku sampai dengan tanggal ${payload.doclastdate} agar dapat digunakan sebagaimana mestinya.`;

    let textTab2 = doc.splitTextToSize(text2, 185, { textIndent: 20 });
    doc.text(20, 172, textTab2);

    let thankText =
      "Atas perhatian dan kerjasama Bapak/Ibu/Sdr/Sdri kami ucapkan terima kasih.";
    doc.text(thankText, 20, 182);

    doc.text("Hormat Kami", 20, 220);
    doc.text("PT Adira Dinamika Multi Finance Tbk", 20, 226);

    doc.setFontSize(9);
    let footerText =
      "*Surat Keterangan ini merupakan alat bukti yang sah dan diterbitkan oleh sistem internal PT ADIRA DINAMIKA MULTI FINANCE Tbk, tanpa tanda tangan.";
    let textTab3 = doc.splitTextToSize(footerText, 190, { textIndent: 20 });
    doc.text(20, 240, textTab3);

    doc.setFontSize(10);
    doc.text("ADIRA FINANCE terdaftar dan diawasi oleh OJK", 20, 250);

    let fileName = payload.docnum.replace("/", "-");
    // doc.output("dataurlnewwindow");
    // let blobData = doc.output("blob");
    doc.save(`${fileName}.pdf`);
    // let file = new Blob([blobData], { type: "application/pdf" });
    // let fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  } else if (payload.flagresponse === "2") {
    // doc.setFontSize(14);
    // doc.text("SURAT KETERANGAN", doc.internal.pageSize.getWidth() / 2, 20, {
    //   align: "center",
    // });

    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text(`${payload.docdate}`, 190, 35, { align: "right" });

    doc.text("Nomor", 20, 50);
    doc.text(":", 50, 50);
    doc.text(`${payload.docnum}`, 55, 50);
    doc.text("Perihal", 20, 56);
    doc.text(":", 50, 56);
    doc.text("Surat Keterangan Lunas", 55, 56);

    doc.setFont("times", "normal");
    doc.text("Kepada Yth,", 20, 70);
    doc.text("Bapak/Ibu/Sdr/sdri", 20, 76);
    doc.text(`${payload.name}`, 20, 82);

    let alamatHeader = doc.splitTextToSize(payload.alamat, 170);
    doc.text(alamatHeader, 20, 88);

    doc.text("Dengan ini menerangkan hal-hal sebagai berikut :", 20, 108);
    doc.text("Nama", 20, 114);
    doc.text(":", 70, 114);
    doc.text(`${payload.name}`, 75, 114);

    doc.text("Alamat", 20, 122);
    doc.text(":", 70, 122);

    let alamatBody = doc.splitTextToSize(payload.alamat, 120);
    doc.text(alamatBody, 75, 122);

    doc.text("No perjanjian pembiayaan", 20, 138);
    doc.text(":", 70, 138);
    doc.text(`${payload.contno}`, 75, 138);

    doc.text("Tanggal perjanjian", 20, 146);
    doc.text(":", 70, 146);
    doc.text(`${payload.contppddate}`, 75, 146);

    doc.text("Tanggal pelunasan", 20, 154);
    doc.text(":", 70, 154);
    doc.text(`${payload.contsettlementdate}`, 75, 154);

    let textDesc = `Terhitung sejak tanggal ${payload.contsettlementdate}, segala hutang dan kewajiban Bapak/Ibu/Sdr/Sdri dinyatakan telah **LUNAS**.`;
    let startX = 20;
    let startY = 164;
    // const fontSize = 10;
    const lineSpacing = 6;

    let textTab = doc.splitTextToSize(textDesc, 185, { textIndent: 20 });

    const startXCached = startX;
    let boldOpen = false;

    textTab.map((text) => {
      if (text) {
        const arrayOfNormalAndBoldText = text.split("**");
        const boldStr = "bold";
        const normalOr = "normal";
        arrayOfNormalAndBoldText.map((textItems, j) => {
          doc.setFont("times", boldOpen ? normalOr : boldStr);
          if (j % 2 === 0) {
            doc.setFont("times", boldOpen ? boldStr : normalOr);
          }
          doc.text(textItems, startX, startY);
          startX = startX + doc.getTextWidth(textItems);
        });
        boldOpen = isBoldOpen(arrayOfNormalAndBoldText.length, boldOpen);

        startX = startXCached;
        startY += lineSpacing;
      }
    });
    doc.setFont("times", "normal");

    // let textTab = doc.splitTextToSize(text, 185, { textIndent: 20 });
    // doc.text(20, 164, textTab);

    let text2 = `Demikian surat Keterangan ini dibuat agar dapat digunakan sebagaimana mestinya. Atas perhatian dan kerjasama Bapak/Ibu/Sdr/Sdri kami ucapkan terima kasih.`;

    let textTab2 = doc.splitTextToSize(text2, 185, { textIndent: 20 });
    doc.text(20, 176, textTab2);

    doc.text("Hormat Kami", 20, 215);
    doc.text("PT Adira Dinamika Multi Finance Tbk", 20, 221);

    doc.setFontSize(9);
    let footerText =
      "*Surat Keterangan ini merupakan alat bukti yang sah dan diterbitkan oleh sistem internal PT ADIRA DINAMIKA MULTI FINANCE Tbk, tanpa tanda tangan.";
    let textTab3 = doc.splitTextToSize(footerText, 190, { textIndent: 20 });
    doc.text(20, 230, textTab3);

    doc.setFontSize(10);
    doc.text("ADIRA FINANCE terdaftar dan diawasi oleh OJK", 20, 240);

    let fileName = payload.docnum.replace("/", "-");
    // doc.output("dataurlnewwindow");
    // let blobData = doc.output("blob");
    doc.save(`${fileName}.pdf`);
    // let file = new Blob([blobData], { type: "application/pdf" });
    // let fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  } else if (payload.flagresponse === "3") {
    // doc.setFontSize(14);
    // doc.text("SURAT KETERANGAN", doc.internal.pageSize.getWidth() / 2, 20, {
    //   align: "center",
    // });

    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text(`${payload.docdate}`, 190, 35, { align: "right" });

    doc.text("Nomor", 20, 50);
    doc.text(":", 50, 50);
    doc.text(`${payload.docnum}`, 55, 50);
    doc.text("Perihal", 20, 56);
    doc.text(":", 50, 56);
    doc.text("Surat Keterangan Lunas Khusus", 55, 56);

    doc.setFont("times", "normal");
    doc.text("Kepada Yth,", 20, 70);
    doc.text("Bapak/Ibu/Sdr/sdri", 20, 76);
    doc.text(`${payload.name}`, 20, 82);
    
    let alamatHeader = doc.splitTextToSize(payload.alamat, 170);
    doc.text(alamatHeader, 20, 88);

    doc.text("Dengan ini menerangkan hal-hal sebagai berikut :", 20, 108);
    doc.text("Nama", 20, 114);
    doc.text(":", 70, 114);
    doc.text(`${payload.name}`, 75, 114);

    doc.text("Alamat", 20, 122);
    doc.text(":", 70, 122);
    
    let alamatBody = doc.splitTextToSize(payload.alamat, 120);
    doc.text(alamatBody, 75, 122);

    doc.text("No perjanjian pembiayaan", 20, 138);
    doc.text(":", 70, 138);
    doc.text(`${payload.contno}`, 75, 138);

    doc.text("Tanggal perjanjian", 20, 146);
    doc.text(":", 70, 146);
    doc.text(`${payload.contppddate}`, 75, 146);

    doc.text("Tanggal pelunasan", 20, 154);
    doc.text(":", 70, 154);
    doc.text(`${payload.contsettlementdate}`, 75, 154);

    let text = `Sehubungan dengan telah dilakukannya pengembalian unit kendaraan jaminan sebagaimana diatur dalam perjanjian pembiayaan tersebut diatas, sebagai bentuk penyelesaian kewajiban kepada PT Adira Dinamika Multi Finance Tbk, maka segala hutang dan kewajiban dinyatakan telah LUNAS.`;

    let textTab = doc.splitTextToSize(text, 175, { textIndent: 10 });
    doc.text(20, 164, textTab, { align: "left" });

    let text2 = `Demikian surat Keterangan ini dibuat agar dapat digunakan sebagaimana mestinya. Atas perhatian dan kerjasama Bapak/Ibu/Sdr/Sdri kami ucapkan terima kasih.`;

    let textTab2 = doc.splitTextToSize(text2, 185, { textIndent: 10 });
    doc.text(20, 180, textTab2);

    doc.text("Hormat Kami", 20, 215);
    doc.text("PT Adira Dinamika Multi Finance Tbk", 20, 221);

    doc.setFontSize(9);
    let footerText =
      "*Surat Keterangan ini merupakan alat bukti yang sah dan diterbitkan oleh sistem internal PT ADIRA DINAMIKA MULTI FINANCE Tbk, tanpa tanda tangan.";
    let textTab3 = doc.splitTextToSize(footerText, 190, { textIndent: 20 });
    doc.text(20, 230, textTab3);

    doc.setFontSize(10);
    doc.text("ADIRA FINANCE terdaftar dan diawasi oleh OJK", 20, 240);

    let fileName = payload.docnum.replace("/", "-");
    // doc.output("dataurlnewwindow");
    // let blobData = doc.output("blob");
    doc.save(`${fileName}.pdf`);
    // let file = new Blob([blobData], { type: "application/pdf" });
    // let fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }
};
