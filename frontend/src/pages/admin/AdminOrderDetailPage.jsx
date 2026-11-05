import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import DotMatrixLoader from '../../components/common/DotMatrixLoader';
import toast from 'react-hot-toast';
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiMailLine,
  RiPhoneLine,
  RiCalendarLine,
  RiMapPinLine,
  RiExternalLinkLine,
  RiAddCircleLine,
  RiSparklingLine,
} from 'react-icons/ri';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Form states
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const loadOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOrderById(id);
      if (res.data?.success) {
        const ord = res.data.order;
        setOrder(ord);
        setInvitation(res.data.invitation);
        setStatus(ord.status);
        setPaymentStatus(ord.payment_status);
        setAmount(ord.amount || 0);
        setNotes(ord.notes || '');
      }
    } catch (err) {
      toast.error('Failed to load order details');
      navigate('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderDetail();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await adminApi.updateOrder(id, {
        status,
        payment_status: paymentStatus,
        amount: Number(amount),
        notes,
      });
      if (res.data?.success) {
        toast.success('Order updated successfully!');
        setOrder(res.data.order);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 font-dmsans">
        <DotMatrixLoader />
        <p className="mt-4 text-xs font-poppins font-medium text-[#b5e8c5]/80 tracking-widest uppercase">
          Loading Order Details...
        </p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-6 font-dmsans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/orders"
            className="p-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/15 text-[#8ab89c] hover:text-white transition-colors"
          >
            <RiArrowLeftLine size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-poppins font-bold text-white tracking-tight">{order.order_number}</h1>
              <OrderStatusBadge status={order.status} />
              <OrderStatusBadge status={order.payment_status} type="payment" />
            </div>
            <p className="text-xs font-dmsans text-[#8ab89c]">
              Placed on {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Link or Create Invitation Button */}
        <div>
          {invitation ? (
            <Link
              to={`/admin/invitations/${invitation.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#123F36] border border-[#b5e8c5]/30 text-[#b5e8c5] text-xs font-poppins font-medium hover:bg-[#1a554a] transition-all"
            >
              <RiSparklingLine size={15} />
              <span>Open Linked Invitation ({invitation.slug})</span>
            </Link>
          ) : (
            <Link
              to={`/admin/invitations/new?order_id=${order.id}&client_name=${encodeURIComponent(
                order.client_name
              )}&couple_names=${encodeURIComponent(order.couple_names || '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C49A45] text-[#020b17] text-xs font-poppins font-semibold uppercase tracking-wider hover:bg-[#d4af37] transition-all shadow-md"
            >
              <RiAddCircleLine size={16} />
              <span>Assemble Invitation for this Order</span>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Order Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-[#031424] border border-[#b5e8c5]/15 space-y-6">
            <h2 className="text-base font-poppins font-semibold text-white border-b border-[#b5e8c5]/10 pb-3">
              Client &amp; Commission Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-dmsans">
              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Client Name</p>
                <p className="text-white text-sm font-poppins font-medium mt-0.5">{order.client_name}</p>
              </div>

              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Couple Names</p>
                <p className="text-white text-sm font-poppins font-medium mt-0.5">{order.couple_names || '—'}</p>
              </div>

              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Email</p>
                <p className="text-[#b5e8c5] mt-0.5 inline-flex items-center gap-1.5 font-dmsans">
                  <RiMailLine size={13} />
                  <span>{order.contact_email}</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Phone</p>
                <p className="text-[#8ab89c] mt-0.5 inline-flex items-center gap-1.5 font-dmsans">
                  <RiPhoneLine size={13} />
                  <span>{order.contact_phone || '—'}</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Product Suite</p>
                <p className="text-white font-medium mt-0.5">{order.product_type}</p>
              </div>

              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Occasion</p>
                <p className="text-[#C49A45] font-medium mt-0.5">{order.occasion}</p>
              </div>

              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Event Date</p>
                <p className="text-white mt-0.5 inline-flex items-center gap-1.5">
                  <RiCalendarLine size={13} />
                  <span>{order.event_date || '—'}</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">City &amp; Venue</p>
                <p className="text-white mt-0.5 inline-flex items-center gap-1.5">
                  <RiMapPinLine size={13} />
                  <span>{order.city_venue || '—'}</span>
                </p>
              </div>
            </div>

            {order.language_calligraphy && (
              <div>
                <p className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">Language &amp; Calligraphy Style</p>
                <p className="text-white text-xs mt-1 p-3 rounded-xl bg-[#020b17] border border-[#b5e8c5]/10 font-dmsans">
                  {order.language_calligraphy}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Management & Status Controls */}
        <div className="space-y-6">
          <form
            onSubmit={handleSave}
            className="p-6 rounded-3xl bg-[#031424] border border-[#b5e8c5]/15 space-y-5 font-dmsans"
          >
            <h2 className="text-base font-poppins font-semibold text-white border-b border-[#b5e8c5]/10 pb-3">
              Status &amp; Pricing Controls
            </h2>

            <div className="space-y-1.5">
              <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                Order Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
              >
                <option value="pending">Pending Review</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">Artisan In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
              >
                <option value="pending">Pending Payment</option>
                <option value="paid">Paid &amp; Settled</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                Commission Amount (₹ INR)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                Internal Artisan Notes
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special calligraphy requests, contact timeline..."
                className="w-full px-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white placeholder-[#8ab89c]/40 focus:outline-none focus:border-[#C49A45] font-dmsans"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full py-3 rounded-xl bg-[#123F36] hover:bg-[#1a554a] text-[#b5e8c5] font-poppins font-semibold text-xs tracking-wider uppercase border border-[#b5e8c5]/30 transition-all flex items-center justify-center gap-2"
            >
              <RiCheckLine size={16} />
              <span>{updating ? 'Saving Changes...' : 'Save Updates'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
