import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import DotMatrixLoader from '../../components/common/DotMatrixLoader';
import {
  RiSearchLine,
  RiFilter3Line,
  RiShoppingBag3Line,
  RiArrowRightLine,
  RiSparklingLine,
} from 'react-icons/ri';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOrders({
        search: search || undefined,
        status: statusFilter || undefined,
        payment_status: paymentFilter || undefined,
      });
      if (res.data?.success) {
        setOrders(res.data.orders || []);
        setTotal(res.data.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter, paymentFilter]);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6 font-dmsans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-white tracking-tight">Client Orders &amp; Inquiries</h1>
          <p className="text-xs font-dmsans text-[#8ab89c]">
            {total} total commission requests received across all wedding suites
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#031424] border border-[#b5e8c5]/15 flex flex-col md:flex-row gap-4 items-center justify-between font-dmsans">
        <div className="relative w-full md:w-80">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8ab89c]" size={15} />
          <input
            type="text"
            placeholder="Search order #, client, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/15 text-xs text-white placeholder-[#8ab89c]/50 focus:outline-none focus:border-[#C49A45] font-dmsans"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto font-dmsans">
          <div className="flex items-center gap-2">
            <RiFilter3Line size={14} className="text-[#8ab89c]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/15 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/15 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
          >
            <option value="">All Payments</option>
            <option value="pending">Payment Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-[#031424] border border-[#b5e8c5]/15 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center font-dmsans">
            <DotMatrixLoader />
            <p className="mt-4 text-xs font-poppins font-medium text-[#b5e8c5]/80 uppercase tracking-widest">
              Fetching Orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center text-[#8ab89c] font-dmsans">
            <RiShoppingBag3Line size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-poppins font-medium text-white">No orders match the current filter</p>
            <p className="text-xs text-[#8ab89c]/60 mt-1 font-dmsans">Try clearing your search or status filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#b5e8c5]/10 text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c] bg-[#020b17]/50">
                  <th className="py-4 px-6">Order</th>
                  <th className="py-4 px-6">Client / Contact</th>
                  <th className="py-4 px-6">Suite &amp; Occasion</th>
                  <th className="py-4 px-6">Event Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b5e8c5]/5 text-xs font-dmsans">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#082133]/40 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-mono font-medium text-white block">
                        {ord.order_number}
                      </span>
                      <span className="text-[10px] text-[#8ab89c]/60">
                        {new Date(ord.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-poppins font-semibold text-white">{ord.client_name}</p>
                      <p className="text-[11px] text-[#8ab89c]">{ord.contact_email}</p>
                      {ord.contact_phone && (
                        <p className="text-[10px] text-[#8ab89c]/70">{ord.contact_phone}</p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-white font-medium">{ord.product_type}</p>
                      <p className="text-[11px] text-[#C49A45]">{ord.occasion}</p>
                    </td>
                    <td className="py-4 px-6 text-[#8ab89c]">
                      {ord.event_date || 'Not specified'}
                    </td>
                    <td className="py-4 px-6">
                      <OrderStatusBadge status={ord.status} />
                    </td>
                    <td className="py-4 px-6">
                      <OrderStatusBadge status={ord.payment_status} type="payment" />
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        to={`/admin/orders/${ord.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#123F36] text-[#b5e8c5] hover:bg-[#1a554a] transition-colors font-poppins font-medium text-xs tracking-wide"
                      >
                        <span>Manage</span>
                        <RiArrowRightLine size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
