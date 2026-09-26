<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://see.fontimg.com/api/rf5/dE0g/NmU5ZTRmNmJkZGFkNDMzNjg3YWFmMjk2NjUzMGY4YTEudHRm/UGluZyBDb2xkIFN0YXJ0/beautiful-people-personal-use.png?r=fs&h=65&w=1000&fg=FFFFFF&bg=00000000&tb=1&s=65">
  <img src="https://see.fontimg.com/api/rf5/dE0g/NmU5ZTRmNmJkZGFkNDMzNjg3YWFmMjk2NjUzMGY4YTEudHRm/UGluZyBDb2xkIFN0YXJ0/beautiful-people-personal-use.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&tb=1&s=65" alt="Ping Cold Start">
</picture>🥶🥶🥶


    
<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=800&size=30&duration=3000&pause=1000&color=00FF9C&center=true&vCenter=true&width=800&lines=ELIMINATE+SERVERLESS+LATENCY;COMMUNITY+KEEP-ALIVE+REGISTRY" alt="Typing SVG" />

<br>

<table>
<tr>
<td width="50%" valign="top">

### Mission
Serverless free tiers suspend idle applications. This registry maintains active states via distributed cron execution. Zero gatekeeping. Zero fees.

</td>
<td width="50%" valign="top">

### Telemetry
![Uptime](https://img.shields.io/badge/Uptime-99.9%25-00FF9C?style=flat-square)
![Ping Interval](https://img.shields.io/badge/Interval-12H-00FF9C?style=flat-square)
![Registry Size](https://img.shields.io/badge/Nodes-Dynamic-00FF9C?style=flat-square)

</td>
</tr>
</table>

</div>

---

<div align="center">

### Infrastructure Matrix

| Domain | Stack |
| :--- | :--- |
| **Interface** | React, Tailwind CSS |
| **Edge Compute** | Netlify Functions |
| **State Management** | Netlify Blobs |
| **Orchestration** | GitHub Actions Cron |

</div>

---

### System Topology

```mermaid
%%{init: {'theme': 'dark'}}%%
flowchart TD
    subgraph Client [User Interface]
        UI[React Dashboard]
    end

    subgraph Edge [Netlify Edge Network]
        API[Serverless Functions]
        DB[(Blob Storage)]
    end

    subgraph Automation [GitHub Actions]
        Cron[Cron Scheduler]
    end

    subgraph Targets [Free Tier Endpoints]
        HF[Hugging Face Spaces]
        ST[Streamlit Cloud]
        RD[Render Instances]
        KY[Koyeb Containers]
    end

    UI -- HTTP POST --> API
    API -- Write State --> DB
    Cron -- Read Registry --> DB
    Cron -- HTTP GET Keep-Alive --> Targets
```

---

### Supported Targets

<table>
<tr>
<td align="center" width="25%">
<b>Hugging Face</b><br>
<img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black"/>
<br><sub>CPU/GPU Sleep: 48h</sub>
</td>
<td align="center" width="25%">
<b>Streamlit</b><br>
<img src="https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white"/>
<br><sub>Inactivity Sleep: 7d</sub>
</td>
<td align="center" width="25%">
<b>Render</b><br>
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black"/>
<br><sub>Spin Down: 15m</sub>
</td>
<td align="center" width="25%">
<b>Koyeb</b><br>
<img src="https://img.shields.io/badge/Koyeb-121212?style=for-the-badge&logo=koyeb&logoColor=white"/>
<br><sub>Free Tier Scaling</sub>
</td>
</tr>
</table>


---

### Deployment & Execution

**Prerequisites**
- Node.js (v18+)
- `pnpm` package manager

**Initialization**
```bash
git clone https://github.com/your-username/ping-cold-start.git
cd ping-cold-start
pnpm install
```

**Local Execution**
```bash
pnpm start
```

---

### Environment Configuration

**Local Variables** `.env`
```env
REACT_APP_API_URL=/.netlify/functions/todos
BLOB_STORE_NAME=<your_store_name>
BLOB_LIST_KEY=<your_list_key>
```

**Repository Secrets** GitHub Actions
| Variable | Description | Example |
| :--- | :--- | :--- |
| `SITE_URL` | Base URL of the deployed registry | `https://ping-cold-start.netlify.app` |

---

<div align="center">

### Documentation & Resources

[Development Learnings](./LEARNINGS.md)

<br>

<sub>Built by programmers, for programmers. 🐱‍💻</sub>

</div>
