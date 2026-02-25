import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePickList = (order) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 46, 77); // Navy Blue
    doc.text('PICK LIST', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Order ID: #${order.id.toUpperCase()}`, 14, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);
    doc.text(`Customer: ${order.customerEmail}`, 14, 49);

    // Table Header
    const tableColumn = ["Item Name", "Category", "Subcategory", "Quantity"];
    const tableRows = [];

    order.items.forEach(item => {
        const itemData = [
            item.name,
            item.category,
            item.subcategory || 'N/A',
            item.quantity || 1
        ];
        tableRows.push(itemData);
    });

    // Generate Table
    doc.autoTable({
        startY: 60,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [15, 46, 77], textColor: [255, 255, 255] },
        styles: { fontSize: 10, cellPadding: 5 },
    });

    // Footer
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text('Please verify all items before packing.', 105, finalY + 10, { align: 'center' });

    doc.save(`PickList_${order.id.slice(-6)}.pdf`);
};

export const generateShippingLabel = (order) => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [100, 150] // Common shipping label size
    });

    // Border
    doc.rect(5, 5, 90, 140);

    // Logo text
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('LANYARD NATION', 50, 15, { align: 'center' });
    doc.line(10, 20, 90, 20);

    // SHIPPING TO
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('SHIP TO:', 10, 30);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(order.customerName || 'Customer', 10, 37);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customerEmail, 10, 44);

    // Placeholder Address (since we don't have it in the order object yet)
    doc.text('Contact for Address details', 10, 51);
    doc.text('City, State, ZIP', 10, 58);

    doc.line(10, 65, 90, 65);

    // ORDER INFO
    doc.text(`ORDER ID: #${order.id.toUpperCase()}`, 10, 75);
    doc.text(`WEIGHT: Approx ${order.items.length * 0.5}kg`, 10, 82);

    // Visual "Barcode" represention
    doc.setFillColor(0, 0, 0);
    let xPos = 15;
    for (let i = 0; i < 40; i++) {
        const width = Math.random() * 1.5 + 0.5;
        doc.rect(xPos, 90, width, 20, 'F');
        xPos += width + Math.random() * 1;
        if (xPos > 85) break;
    }

    doc.setFontSize(8);
    doc.text('Lanyard Nation Fulfillment Center', 50, 140, { align: 'center' });

    doc.save(`ShippingLabel_${order.id.slice(-6)}.pdf`);
};
