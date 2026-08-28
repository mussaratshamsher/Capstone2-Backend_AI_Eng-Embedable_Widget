'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { getWebhooks, createWebhook, deleteWebhook, updateWebhook } from '@/lib/api';
import type { Webhook } from '@/types';

function WebhooksContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project') || '';
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');

  const loadData = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const data = await getWebhooks(projectId);
      setWebhooks(data);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load webhooks', 'error');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCreateWebhook(e: React.FormEvent) {
    e.preventDefault();
    if (!newUrl) return;
    
    try {
      // Validate URL roughly
      new URL(newUrl);
    } catch {
      toast('Please enter a valid URL (e.g. https://hook.example.com)', 'error');
      return;
    }
    
    try {
      const created = await createWebhook({
        project_id: projectId,
        url: newUrl,
        is_active: true,
      });
      setWebhooks([...webhooks, created]);
      setNewUrl('');
      toast('Webhook added successfully', 'success');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to add webhook', 'error');
    }
  }

  async function handleToggle(id: string, currentActive: boolean) {
    try {
      const updated = await updateWebhook(id, { is_active: !currentActive });
      setWebhooks(webhooks.map((w) => w.id === id ? updated : w));
      toast('Webhook updated', 'success');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update webhook', 'error');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this webhook?')) return;
    
    try {
      await deleteWebhook(id);
      setWebhooks(webhooks.filter(w => w.id !== id));
      toast('Webhook deleted', 'success');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete webhook', 'error');
    }
  }

  if (!projectId) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-4">Select a Project</h2>
          <p className="text-zinc-400 mb-6">Choose a project from the dashboard to configure webhooks.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Webhooks</h1>
          <p className="text-zinc-400">Connect your leads to external CRMs like HubSpot or Salesforce via Zapier/Make.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Webhook</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateWebhook} className="flex gap-3">
              <Input
                placeholder="https://hooks.zapier.com/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit">Add Webhook</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configured Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-zinc-400 text-sm py-4">Loading webhooks...</p>
            ) : webhooks.length === 0 ? (
              <p className="text-zinc-400 text-sm py-4">No webhooks configured yet.</p>
            ) : (
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <div className="flex-1 truncate pr-4">
                      <p className="text-white font-mono text-sm truncate">{webhook.url}</p>
                      <p className="text-zinc-400 text-xs mt-1">
                        Added on {new Date(webhook.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggle(webhook.id, webhook.is_active)}
                        className={`text-xs px-2 py-1 rounded border ${
                          webhook.is_active 
                            ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        {webhook.is_active ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => handleDelete(webhook.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                        title="Delete webhook"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function WebhooksPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-8 text-center text-zinc-400">Loading...</div></DashboardLayout>}>
      <WebhooksContent />
    </Suspense>
  );
}
