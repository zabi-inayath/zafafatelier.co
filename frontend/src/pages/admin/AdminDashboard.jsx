import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import DotMatrixLoader from '../../components/common/DotMatrixLoader';
import {
  RiShoppingBag3Line,
  RiMailLine,
  RiSparklingLine,
  RiTimeLine,
  RiArrowRightLine,
  RiAddCircleLine,
  RiExternalLinkLine,
  RiShieldCheckLine,
} from 'react-icons/ri';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await adminApi.getStats();
        if (res.data?.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        setError('Failed to load dashboard data. Check backend connection.');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 font-dmsans">
        <DotMatrixLoader />
        <p className="mt-4 text-xs font-poppins font-medium text-[#b5e8c5]/80 tracking-widest uppercase">
          Loading Artisan Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8 font-dmsans">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#031424] via-[#082133] to-[#031424] p-8 border border-[#b5e8c5]/20 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123F36] text-[#b5e8c5] text-[11px] font-poppins font-medium tracking-wider border border-[#b5e8c5]/30">
              <RiShieldCheckLine size={13} />
              <span>COMMAND & CRAFT CENTER</span>
            </div>
            <h1 className="text-3xl font-poppins font-bold text-white tracking-tight">
              Bespoke Invitation Atelier
            </h1>
            <p className="text-xs font-dmsans text-[#8ab89c] max-w-xl">
              Oversee client order commissions, assemble dynamic template suites, and publish live interactive invitations directly to couples worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/invitations/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#C49A45] to-[#E8D5A3] text-[#020b17] font-poppins font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-lg"
            >
              <RiAddCircleLine size={16} />
              <span>New Invitation</span>
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-dmsans">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#031424] border border-[#b5e8c5]/15 space-y-3">
          <div className="flex items-center justify-between text-[#8ab89c]">
            <span className="text-xs font-poppins font-semibold uppercase tracking-wider">Total Inquiries</span>
            <div className="p-2 rounded-xl bg-[#082133] text-[#b5e8c5]">
              <RiShoppingBag3Line size={18} />
            </div>
          </div>
          <p className="text-3xl font-poppins font-bold text-white">{stats?.totalOrders || 0}</p>
          <p className="text-[11px] font-dmsans text-[#8ab89c]/70">All customer commission requests</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#031424] border border-[#b5e8c5]/15 space-y-3">
          <div className="flex items-center justify-between text-[#8ab89c]">
            <span className="text-xs font-poppins font-semibold uppercase tracking-wider">Pending Action</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-300">
              <RiTimeLine size={18} />
            </div>
          </div>
          <p className="text-3xl font-poppins font-bold text-amber-300">{stats?.pendingOrders || 0}</p>
          <p className="text-[11px] font-dmsans text-[#8ab89c]/70">Orders awaiting artisan drafting</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#031424] border border-[#b5e8c5]/15 space-y-3">
          <div className="flex items-center justify-between text-[#8ab89c]">
            <span className="text-xs font-poppins font-semibold uppercase tracking-wider">Live Published</span>
            <div className="p-2 rounded-xl bg-[#123F36] text-[#b5e8c5]">
              <RiSparklingLine size={18} />
            </div>
          </div>
          <p className="text-3xl font-poppins font-bold text-[#b5e8c5]">{stats?.publishedInvitations || 0}</p>
          <p className="text-[11px] font-dmsans text-[#8ab89c]/70">Currently active on /invite/:slug</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#031424] border border-[#b5e8c5]/15 space-y-3">
          <div className="flex items-center justify-between text-[#8ab89c]">
            <span className="text-xs font-poppins font-semibold uppercase tracking-wider">Total Invitations</span>
            <div className="p-2 rounded-xl bg-[#082133] text-[#C49A45]">
              <RiMailLine size={18} />
            </div>
          </div>
          <p className="text-3xl font-poppins font-bold text-white">{stats?.totalInvitations || 0}</p>
          <p className="text-[11px] font-dmsans text-[#8ab89c]/70">Drafts and published suites</p>
        </div>
      </div>

      {/* Two Columns: Recent Orders & Recent Invitations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="p-6 rounded-3xl bg-[#031424] border border-[#b5e8c5]/15 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-poppins font-semibold text-white">Recent Client Orders</h2>
              <p className="text-xs font-dmsans text-[#8ab89c]">Latest commissions placed via website</p>
            </div>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-poppins font-medium text-[#b5e8c5] hover:underline"
            >
              <span>View All</span>
              <RiArrowRightLine size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentOrders?.length === 0 ? (
              <p className="text-xs font-dmsans text-[#8ab89c]/60 py-4 text-center">No orders recorded yet.</p>
            ) : (
              stats?.recentOrders?.map((ord) => (
                <Link
                  key={ord.id}
                  to={`/admin/orders/${ord.id}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/10 hover:border-[#b5e8c5]/30 transition-all group"
                >
                  <div className="space-y-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-white group-hover:text-[#b5e8c5] transition-colors">
                        {ord.order_number}
                      </span>
                      <OrderStatusBadge status={ord.status} />
                    </div>
                    <p className="text-xs font-dmsans text-[#8ab89c] truncate">{ord.client_name} • {ord.occasion}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-poppins font-semibold text-white">
                      {ord.amount > 0 ? `₹${Number(ord.amount).toLocaleString('en-IN')}` : 'Bespoke Quote'}
                    </p>
                    <p className="text-[10px] font-dmsans text-[#8ab89c]/60">
                      {new Date(ord.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Invitations */}
        <div className="p-6 rounded-3xl bg-[#031424] border border-[#b5e8c5]/15 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-poppins font-semibold text-white">Recent Invitations</h2>
              <p className="text-xs font-dmsans text-[#8ab89c]">Draft and published interactive wedding sites</p>
            </div>
            <Link
              to="/admin/invitations"
              className="inline-flex items-center gap-1 text-xs font-poppins font-medium text-[#b5e8c5] hover:underline"
            >
              <span>View All</span>
              <RiArrowRightLine size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentInvitations?.length === 0 ? (
              <p className="text-xs font-dmsans text-[#8ab89c]/60 py-4 text-center">No invitations crafted yet.</p>
            ) : (
              stats?.recentInvitations?.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/10 hover:border-[#b5e8c5]/30 transition-all"
                >
                  <div className="space-y-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/invitations/${inv.id}`}
                        className="text-xs font-poppins font-medium text-white hover:text-[#b5e8c5] transition-colors truncate"
                      >
                        {inv.groom_name} &amp; {inv.bride_name}
                      </Link>
                      <OrderStatusBadge status={inv.status} />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-dmsans text-[#8ab89c]">
                      <span className="font-mono">/invite/{inv.slug}</span>
                      <span>•</span>
                      <span>{inv.template_slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {inv.status === 'published' && (
                      <a
                        href={`/invite/${inv.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Live Public URL"
                        className="p-2 rounded-xl bg-[#031424] text-[#b5e8c5] hover:text-white border border-[#b5e8c5]/20 text-xs transition-colors"
                      >
                        <RiExternalLinkLine size={14} />
                      </a>
                    )}
                    <Link
                      to={`/admin/invitations/${inv.id}`}
                      className="px-3 py-1.5 rounded-xl bg-[#123F36] text-[#b5e8c5] text-xs font-poppins font-medium hover:bg-[#1a554a] transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
