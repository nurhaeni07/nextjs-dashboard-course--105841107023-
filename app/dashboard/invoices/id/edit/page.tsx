import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};
export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const invoiceId = params.id;

  // Ambil data invoice dan daftar customer
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(invoiceId),
    fetchCustomers(),
  ]);

  if (!invoice) {
    return <p>Invoice not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Invoice</h1>
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </div>
  );
}
