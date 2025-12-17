export function filterCandidates(candidates, keyword) {
    if (!keyword || keyword.trim() === '') {
        return candidates;
    }
    
    const searchText = keyword.toLowerCase().trim();
    
    return candidates.filter(candidate => {
        const name = (candidate.fullName || '').toLowerCase();
        const phone = (candidate.phoneNumber || '').toLowerCase();
        const email = (candidate.email || '').toLowerCase();
        
        return name.includes(searchText) || 
               phone.includes(searchText) || 
               email.includes(searchText);
    });
}
