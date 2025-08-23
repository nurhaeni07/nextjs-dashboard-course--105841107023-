'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { Button } from '@/app/ui/button';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };

  // Bind Server Action dengan invoice.id
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  // Gunakan useActionState
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Customer Dropdown */}
      <div>
        <label htmlFor="customerId" className="block text-sm font-medium">
          Customer
        </label>
        <select
          id="customerId"
          name="customerId"
          defaultValue={invoice.customer_id}
          className="mt-1 block w-full border rounded-md p-2"
          aria-describedby="customer-error"
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <div id="customer-error" aria-live="polite">
          {state.errors?.customerId?.map((err) => (
            <p key={err} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          defaultValue={invoice.amount / 100}
          className="mt-1 block w-full border rounded-md p-2"
          aria-describedby="amount-error"
        />
        <div id="amount-error" aria-live="polite">
          {state.errors?.amount?.map((err) => (
            <p key={err} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium">Status</label>
        <div className="flex gap-4 mt-2">
          <label>
            <input
              type="radio"
              name="status"
              value="pending"
              defaultChecked={invoice.status === 'pending'}
            />
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="paid"
              defaultChecked={invoice.status === 'paid'}
            />
            Paid
          </label>
        </div>
        <div id="status-error" aria-live="polite">
          {state.errors?.status?.map((err) => (
            <p key={err} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>
      </div>

      <Button type="submit">Update Invoice</Button>
    </form>
  );
}
