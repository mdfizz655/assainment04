let jobs = [
    { id: 1, companyName: "Google", position: "Frontend Developer", location: "Mountain View, CA", type: "Full-time", salary: "$120k - $150k", description: "Develop and maintain user-facing features using modern web technologies.", status: "applied" },
    { id: 2, companyName: "Meta", position: "Product Designer", location: "Menlo Park, CA", type: "Full-time", salary: "$110k - $140k", description: "Design intuitive and high-impact interfaces for global social platforms.", status: "applied" },
    { id: 3, companyName: "Amazon", position: "Software Engineer", location: "Seattle, WA", type: "Full-time", salary: "$130k - $160k", description: "Work on cloud-based systems and massive database architectures.", status: "applied" },
    { id: 4, companyName: "Netflix", position: "UI Engineer", location: "Los Gatos, CA", type: "Full-time", salary: "$140k - $180k", description: "Optimizing video delivery and UI interaction for millions of viewers.", status: "applied" },
    { id: 5, companyName: "Tesla", position: "AI Engineer", location: "Austin, TX", type: "Full-time", salary: "$150k - $200k", description: "Developing vision-based AI for autonomous vehicle navigation.", status: "applied" },
    { id: 6, companyName: "Microsoft", position: "Azure Developer", location: "Redmond, WA", type: "Full-time", salary: "$125k - $155k", description: "Building scalable enterprise solutions on the Azure ecosystem.", status: "applied" },
    { id: 7, companyName: "Spotify", position: "Backend Developer", location: "Stockholm, SE", type: "Full-time", salary: "$100k - $130k", description: "Managing data pipelines and music streaming infrastructure.", status: "applied" },
    { id: 8, companyName: "Adobe", position: "Creative Software Developer", location: "San Jose, CA", type: "Full-time", salary: "$115k - $145k", description: "Innovating digital design tools like Photoshop and Illustrator.", status: "applied" }
];

let currentTab = 'all';


function renderJobs() {
    const container = document.getElementById('job-container');
    const emptyState = document.getElementById('empty-state');
    container.innerHTML = '';

    let filteredJobs = currentTab === 'all' ? jobs : jobs.filter(job => job.status === currentTab);

    if (filteredJobs.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        emptyState.classList.add('hidden');
    }

    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "bg-white p-8 rounded-[32px] shadow-sm border border-gray-50 flex flex-col md:flex-row items-center gap-6 relative hover:shadow-md transition-all";
        
        card.innerHTML = `
            <div class="flex-1 w-full">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-xl font-extrabold text-gray-800">${job.companyName}</h4>
                        <p class="text-indigo-600 font-bold text-sm mb-3">${job.position}</p>
                    </div>
                    <button onclick="deleteJob(${job.id})" class="text-gray-300 hover:text-red-500 transition px-2">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
                
                <div class="flex flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase mb-4">
                    <span>${job.location}</span>
                    <span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded">${job.type}</span>
                    <span class="text-green-600">${job.salary}</span>
                </div>
                
                <p class="text-gray-500 text-sm italic font-medium leading-relaxed">${job.description}</p>
            </div>

            <div class="flex gap-3 w-full md:w-auto">
                <button onclick="updateStatus(${job.id}, 'interview')" 
                    class="flex-1 md:w-36 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${job.status === 'interview' ? 'bg-orange-500 text-white shadow-lg' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}">
                    Interview
                </button>
                <button onclick="updateStatus(${job.id}, 'rejected')" 
                    class="flex-1 md:w-36 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${job.status === 'rejected' ? 'bg-red-500 text-white shadow-lg' : 'bg-red-50 text-red-600 hover:bg-red-100'}">
                    Rejected
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    updateDashboard();
}

function updateStatus(id, newStatus) {
    jobs = jobs.map(job => {
        if (job.id === id) {
            return { ...job, status: job.status === newStatus ? 'applied' : newStatus };
        }
        return job;
    });
    renderJobs();
}


function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    renderJobs();
}

function updateDashboard() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
    
    let currentCount = currentTab === 'all' ? jobs.length : jobs.filter(j => j.status === currentTab).length;
    document.getElementById('section-count').innerText = currentCount;
}