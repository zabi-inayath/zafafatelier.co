import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import DotMatrixLoader from '../../components/common/DotMatrixLoader';
import toast from 'react-hot-toast';
import {
  RiAddCircleLine,
  RiMailLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiCheckLine,
  RiCloseLine,
  RiArchiveLine,
  RiEditLine,
  RiSparklingLine,
} from 'react-icons/ri';

export default function AdminInvitationsPage() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [copiedSlug, setCopiedSlug] = useState(null);

  const loadInvitations = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getInvitations({
        status: statusFilter || undefined,
      });
      if (res.data?.success) {
        setInvitations(res.data.invitations || []);
        setTotal(res.data.total || 0);
      }
    } catch (err) {
      toast.error('Failed to load invitations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, [statusFilter]);

  const handlePublish = async (id) => {
    try {
      const res = await adminApi.publishInvitation(id);
      if (res.data?.success) {
        toast.success(res.data.message);
        loadInvitations();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish invitation');
    }
  };

  const handleUnpublish = async (id) => {
    try {
      const res = await adminApi.unpublishInvitation(id);
      if (res.data?.success) {
        toast.success(res.data.message);
        loadInvitations();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to unpublish invitation');
    }
  };

  const handleArchive = async (id) => {
    if (!window.confirm('Are you sure you want to archive this invitation suite?')) return;
    try {
      const res = await adminApi.archiveInvitation(id);
      if (res.data?.success) {
        toast.success('Invitation archived.');
        loadInvitations();
      }
    } catch (err) {
      toast.error('Failed to archive invitation');
    }
  };

  const copyUrl = (slug) => {
    const url = `${window.location.origin}/invite/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    toast.success('Public URL copied to clipboard!');
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6 font-dmsans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-white tracking-tight">Interactive Wedding Invitations</h1>
          <p className="text-xs font-dmsans text-[#8ab89c]">
            {total} bespoke web invitation suites configured
          </p>
        </div>

        <Link
          to="/admin/invitations/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#C49A45] to-[#E8D5A3] text-[#020b17] font-poppins font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-lg self-start sm:self-auto"
        >
          <RiAddCircleLine size={16} />
          <span>New Invitation</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#b5e8c5]/10 pb-3 font-poppins">
        {[
          { label: 'All Suites', value: '' },
          { label: 'Published Live', value: 'published' },
          { label: 'Drafts', value: 'draft' },
          { label: 'Archived', value: 'archived' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-colors ${
              statusFilter === tab.value
                ? 'bg-[#123F36] text-[#b5e8c5] border border-[#b5e8c5]/30'
                : 'text-[#8ab89c] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Invitations List */}
      <div className="rounded-3xl bg-[#031424] border border-[#b5e8c5]/15 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center font-dmsans">
            <DotMatrixLoader />
            <p className="mt-4 text-xs font-poppins font-medium text-[#b5e8c5]/80 uppercase tracking-widest">
              Loading Suites...
            </p>
          </div>
        ) : invitations.length === 0 ? (
          <div className="py-20 text-center text-[#8ab89c] font-dmsans">
            <RiMailLine size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-poppins font-medium text-white">No invitations found in this status</p>
            <div className="mt-4">
              <Link
                to="/admin/invitations/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123F36] text-[#b5e8c5] text-xs font-poppins font-medium hover:bg-[#1a554a]"
              >
                <RiAddCircleLine size={14} />
                <span>Craft Your First Invitation</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-dmsans">
              <thead>
                <tr className="border-b border-[#b5e8c5]/10 text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c] bg-[#020b17]/50">
                  <th className="py-4 px-6">Couple Names</th>
                  <th className="py-4 px-6">Slug &amp; Live Link</th>
                  <th className="py-4 px-6">Template Suite</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Published At</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b5e8c5]/5 text-xs">
                {invitations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#082133]/40 transition-colors">
                    <td className="py-4 px-6">
                      <Link
                        to={`/admin/invitations/${inv.id}`}
                        className="font-poppins font-semibold text-white hover:text-[#b5e8c5] text-sm block"
                      >
                        {inv.groom_name || 'Groom'} &amp; {inv.bride_name || 'Bride'}
                      </Link>
                      {inv.order_id && (
                        <Link
                          to={`/admin/orders/${inv.order_id}`}
                          className="text-[10px] font-dmsans text-[#C49A45] hover:underline"
                        >
                          Linked to Order #{inv.order_id}
                        </Link>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#8ab89c]">
                          /invite/{inv.slug}
                        </span>
                        <button
                          onClick={() => copyUrl(inv.slug)}
                          title="Copy Full Link"
                          className="p-1 rounded text-[#8ab89c] hover:text-white"
                        >
                          {copiedSlug === inv.slug ? (
                            <RiCheckLine size={13} className="text-emerald-400" />
                          ) : (
                            <RiFileCopyLine size={13} />
                          )}
                        </button>
                        {inv.status === 'published' && (
                          <a
                            href={`/invite/${inv.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Visit Public Page"
                            className="p-1 rounded text-[#b5e8c5] hover:text-white"
                          >
                            <RiExternalLinkLine size={13} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#020b17] text-[#C49A45] border border-[#C49A45]/30">
                        <RiSparklingLine size={11} />
                        {inv.template_slug}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <OrderStatusBadge status={inv.status} />
                    </td>
                    <td className="py-4 px-6 text-[#8ab89c]">
                      {inv.published_at ? new Date(inv.published_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        to={`/admin/invitations/${inv.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#123F36] text-[#b5e8c5] hover:bg-[#1a554a] transition-colors font-poppins font-medium text-xs tracking-wide"
                      >
                        <RiEditLine size={13} />
                        <span>Edit Suite</span>
                      </Link>

                      {inv.status === 'published' ? (
                        <button
                          onClick={() => handleUnpublish(inv.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-poppins font-medium transition-colors"
                        >
                          Unpublish
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePublish(inv.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-poppins font-medium transition-colors"
                        >
                          Publish Live
                        </button>
                      )}

                      {inv.status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(inv.id)}
                          title="Archive"
                          className="p-1.5 rounded-xl text-[#8ab89c] hover:text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                        >
                          <RiArchiveLine size={14} />
                        </button>
                      )}
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
