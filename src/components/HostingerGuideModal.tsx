import React, { useState } from 'react';
import {
  X,
  Server,
  Database,
  GitBranch,
  Terminal,
  CheckCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface HostingerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Hostinger VPS / Cloud Configuration',
      desc: 'Set up an Ubuntu 22.04 / 24.04 VPS instance on Hostinger with Node.js 20+ and PM2 process manager.',
      code: `# SSH into your Hostinger VPS
ssh root@your-hostinger-ip

# Install Node.js 20 and PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx git
npm install -g pm2`,
    },
    {
      title: '2. Database Engine (DuckDB or PostgreSQL)',
      desc: 'Use DuckDB for zero-maintenance embedded analytical storage, or PostgreSQL for high-concurrency relational data. Schemas are in src/data/db-schema.sql.',
      code: `# For DuckDB (Zero config, embedded file database):
npm install duckdb

# For PostgreSQL:
apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE DATABASE mandir_trust;"
sudo -u postgres psql -d mandir_trust -f src/data/db-schema.sql`,
    },
    {
      title: '3. Automated GitHub Actions GitOps Pipeline',
      desc: 'Configure GitHub Secrets in your repository (Settings → Secrets and variables → Actions).',
      code: `# Required Repository Secrets:
HOSTINGER_SSH_HOST = your-vps-ip-address
HOSTINGER_SSH_USER = root (or deploy user)
HOSTINGER_SSH_KEY  = Private Ed25519 or RSA SSH key
RAZORPAY_KEY_ID    = rzp_live_xxxxxxxx
RAZORPAY_SECRET    = your_razorpay_secret

# The workflow in .github/workflows/deploy.yml will auto-build
# and execute zero-downtime deployment on git push!`,
    },
    {
      title: '4. Nginx Reverse Proxy on Port 3000',
      desc: 'Configure Nginx on Hostinger to route temple domain HTTPS traffic directly to the Express server.',
      code: `# /etc/nginx/sites-available/rammandir.conf
server {
    server_name rammandirtrust.org www.rammandirtrust.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Enable site and SSL
ln -s /etc/nginx/sites-available/rammandir.conf /etc/nginx/sites-enabled/
certbot --nginx -d rammandirtrust.org -d www.rammandirtrust.org`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative max-w-3xl w-full bg-stone-950 text-stone-100 rounded-2xl shadow-2xl border border-stone-800 my-8 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-stone-900 p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold font-serif-title text-white">
              Hostinger GitOps &amp; Database Architecture Blueprint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack Open-Source Mandir Architecture</span>
            </div>
            <p className="leading-relaxed">
              This repository contains the complete production-ready code: an Express API Gateway serving endpoints on <code className="text-white">/api/v1/*</code>, integrated with Vite React/Next.js components, compliant with Form 10BE (80G), and a zero-dependency GitOps pipeline ready for Hostinger.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((st, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-300 font-mono">
                    {st.title}
                  </h4>
                  <button
                    onClick={() => copyToClipboard(st.code, idx)}
                    className="text-[11px] text-stone-400 hover:text-stone-200 bg-stone-900 border border-stone-800 px-2 py-1 rounded flex items-center gap-1"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-400">{st.desc}</p>
                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
                  {st.code}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 flex justify-end">
            <button
              onClick={onClose}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition"
            >
              Close Blueprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
