"use client"
function DownloadNow() {
    const redirectToAppStore = () => {
      if (typeof window === 'undefined') return; // Ensure the code runs only on the client-side
  
      const userAgent = navigator.userAgent || navigator.vendor;
  
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        // Redirect to Apple App Store
        window.location.href = 'https://apps.apple.com/us/app/orderlay/id6504802718';
      } else if (/android/i.test(userAgent)) {
        // Redirect to Google Play Store
        window.location.href = 'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1';
      } else if (/Windows/i.test(userAgent)) {
        // Redirect Windows laptops to Google Play Store
        window.location.href = 'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1';
      } else if (/Macintosh/i.test(userAgent)) {
        // Redirect Mac laptops to Google Play Store
        window.location.href = 'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1';
      } else {
        // Handle other platforms
        alert('The app is available only for iOS and Android devices.');
      }
    };
  
    return (

                  <button onClick={()=>redirectToAppStore()} className="w-full xs:max-w-[150px] sm:max-w-[240px] p-1 sm:p-3 capitalize bg-white text-primary font-medium rounded-[4px] text-sm sm:text-lg border border-primary">download now</button>

    );
  }
  
  export default DownloadNow;
  