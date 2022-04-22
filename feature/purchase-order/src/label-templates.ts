export const getPurchaseOrderLabel = (poNumber: number, date: string) => `<html>
<body style="font-family:System, sans-serif;">
    <table width="50%" border="1" style="border-collapse: collapse;">
        <tr><th style="padding:20;font-size: 32;font-weight:bold">PO #${poNumber}</th></tr>
        <tr align="center"><td style="padding:40; font-size:24;font-weight:bold">${date}</td></tr>
    </table>
</body>
</html>`
