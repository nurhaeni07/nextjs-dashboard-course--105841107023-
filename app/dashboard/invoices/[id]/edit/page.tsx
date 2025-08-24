import { Metadata } from 'next';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

interface EditInvoicePageProps {
  params: {
    id: string;
  };
}

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const invoiceId = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(invoiceId),
    fetchCustomers(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Invoice</h1>
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </div>
  );
}
