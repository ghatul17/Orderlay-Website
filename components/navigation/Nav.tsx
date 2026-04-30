"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const router = useRouter()
  const pathname = usePathname()
  const faqHref = ['/', '/restaurant'].includes(pathname) ? `${pathname}#community` : '/#community'
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);  // Add shadow if scrolled
      } else {
        setHasScrolled(false); // Remove shadow if at the top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`w-full bg-white top-0 sticky z-10 ${hasScrolled ? 'shadow-sm' : ''}`}>

      <nav className="border-gray-100 border-b md:border-b-0 container">
        <div>
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                {/* Logo SVG */}
                <Link href={'/'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="90" height="45" viewBox="0 0 90 45" fill="none">
                    <path d="M28.9453 39.7859V21.5365H31.6306V39.7859H28.9453Z" fill="black" />
                    <path d="M39.6045 40.1509C38.6833 40.1509 37.8578 39.9944 37.1278 39.6816C36.4152 39.3687 35.8416 38.9082 35.4071 38.2999C34.99 37.6915 34.7814 36.9529 34.7814 36.0839C34.7814 35.1975 34.99 34.4675 35.4071 33.8939C35.8416 33.303 36.4239 32.8598 37.1539 32.5643C37.9012 32.2689 38.7442 32.1211 39.6827 32.1211H43.5933V31.2869C43.5933 30.5395 43.3673 29.9399 42.9154 29.488C42.4636 29.0361 41.7683 28.8102 40.8298 28.8102C39.9086 28.8102 39.2047 29.0274 38.7181 29.4619C38.2314 29.8965 37.9099 30.4613 37.7535 31.1565L35.2507 30.3483C35.4593 29.6531 35.7895 29.0274 36.2414 28.4713C36.7107 27.8977 37.3277 27.4371 38.0924 27.0895C38.8571 26.7419 39.7783 26.5681 40.8559 26.5681C42.5244 26.5681 43.8366 26.9939 44.7925 27.8456C45.7484 28.6972 46.2264 29.9051 46.2264 31.4694V36.7617C46.2264 37.2831 46.4697 37.5438 46.9564 37.5438H48.0513V39.7859H46.0439C45.4356 39.7859 44.9403 39.6295 44.5579 39.3166C44.1755 39.0038 43.9843 38.5779 43.9843 38.0391V37.9609H43.5933C43.4542 38.2216 43.2457 38.5258 42.9676 38.8734C42.6895 39.221 42.2811 39.5252 41.7423 39.7859C41.2035 40.0292 40.4909 40.1509 39.6045 40.1509ZM39.9956 37.9349C41.0731 37.9349 41.9421 37.6307 42.6026 37.0224C43.2631 36.3967 43.5933 35.5451 43.5933 34.4675V34.2068H39.8391C39.1265 34.2068 38.553 34.3632 38.1185 34.676C37.684 34.9715 37.4667 35.4147 37.4667 36.0056C37.4667 36.5966 37.6927 37.0658 38.1445 37.4135C38.5964 37.7611 39.2134 37.9349 39.9956 37.9349Z" fill="black" />
                    <path d="M51.8173 45V42.6536H58.9867C59.4734 42.6536 59.7167 42.3929 59.7167 41.8715V37.9088H59.2996C59.1431 38.2564 58.8998 38.5953 58.5696 38.9255C58.2567 39.2384 57.8309 39.4991 57.2921 39.7077C56.7533 39.9162 56.0755 40.0205 55.2586 40.0205C54.2853 40.0205 53.4163 39.8033 52.6516 39.3687C51.8868 38.9342 51.2872 38.3172 50.8527 37.5177C50.4182 36.7182 50.2009 35.771 50.2009 34.676V26.9331H52.8862V34.4675C52.8862 35.5798 53.1643 36.4054 53.7205 36.9442C54.2766 37.4656 55.0501 37.7263 56.0407 37.7263C57.1357 37.7263 58.0134 37.3613 58.6739 36.6313C59.3517 35.9014 59.6906 34.8412 59.6906 33.4507V26.9331H62.3759V42.419C62.3759 43.2011 62.1412 43.8268 61.672 44.2961C61.2201 44.7653 60.5944 45 59.7949 45H51.8173Z" fill="black" />
                    <path d="M30.148 18.6144C28.8618 18.6144 27.7147 18.3537 26.7067 17.8322C25.716 17.2935 24.9339 16.5287 24.3603 15.538C23.7868 14.5474 23.5 13.3742 23.5 12.0185V11.6275C23.5 10.2718 23.7868 9.10731 24.3603 8.13401C24.9339 7.14333 25.716 6.37859 26.7067 5.8398C27.7147 5.30101 28.8618 5.03161 30.148 5.03161C31.4341 5.03161 32.5812 5.30101 33.5893 5.8398C34.5974 6.37859 35.3882 7.14333 35.9617 8.13401C36.5353 9.10731 36.822 10.2718 36.822 11.6275V12.0185C36.822 13.3742 36.5353 14.5474 35.9617 15.538C35.3882 16.5287 34.5974 17.2935 33.5893 17.8322C32.5812 18.3537 31.4341 18.6144 30.148 18.6144ZM30.148 16.2159C31.3299 16.2159 32.2858 15.8422 33.0157 15.0948C33.7631 14.3301 34.1368 13.2786 34.1368 11.9403V11.7057C34.1368 10.3674 33.7718 9.32456 33.0418 8.5772C32.3118 7.81247 31.3472 7.4301 30.148 7.4301C28.9835 7.4301 28.0276 7.81247 27.2802 8.5772C26.5503 9.32456 26.1853 10.3674 26.1853 11.7057V11.9403C26.1853 13.2786 26.5503 14.3301 27.2802 15.0948C28.0276 15.8422 28.9835 16.2159 30.148 16.2159Z" fill="black" />
                    <path d="M40.1652 18.2494V5.3966H42.7983V6.90869H43.2154C43.424 6.3699 43.7542 5.97884 44.2061 5.73552C44.6754 5.47481 45.2489 5.34446 45.9268 5.34446H47.4649V7.76902H45.8225C44.9535 7.76902 44.2409 8.01234 43.6847 8.49899C43.1285 8.96826 42.8504 9.69824 42.8504 10.6889V18.2494H40.1652Z" fill="black" />
                    <path d="M55.1073 18.6144C54.0471 18.6144 53.0651 18.3537 52.1613 17.8322C51.2575 17.3108 50.5275 16.5635 49.9714 15.5902C49.4326 14.5995 49.1632 13.4089 49.1632 12.0185V11.6275C49.1632 10.2544 49.4326 9.07255 49.9714 8.08187C50.5102 7.09119 51.2314 6.33514 52.1352 5.81373C53.039 5.29232 54.0297 5.03161 55.1073 5.03161C55.9415 5.03161 56.6367 5.13589 57.1929 5.34446C57.7665 5.55302 58.2357 5.82242 58.6007 6.15265C58.9657 6.46549 59.2438 6.79572 59.435 7.14333H59.8521V0H62.5374V18.2494H59.9042V16.4244H59.4871C59.1569 16.9806 58.6529 17.4846 57.975 17.9365C57.3146 18.3884 56.3586 18.6144 55.1073 18.6144ZM55.8633 16.268C57.0278 16.268 57.9837 15.8943 58.7311 15.147C59.4958 14.3996 59.8782 13.3307 59.8782 11.9403V11.7057C59.8782 10.3326 59.5045 9.27242 58.7571 8.52506C58.0098 7.77771 57.0452 7.40403 55.8633 7.40403C54.7162 7.40403 53.7603 7.77771 52.9955 8.52506C52.2482 9.27242 51.8745 10.3326 51.8745 11.7057V11.9403C51.8745 13.3307 52.2482 14.3996 52.9955 15.147C53.7603 15.8943 54.7162 16.268 55.8633 16.268Z" fill="black" />
                    <path d="M72.3822 18.6144C71.0787 18.6144 69.9403 18.345 68.967 17.8062C67.9937 17.25 67.229 16.4766 66.6728 15.4859C66.134 14.4778 65.8646 13.3134 65.8646 11.9924V11.6796C65.8646 10.3413 66.134 9.17683 66.6728 8.18615C67.2116 7.17809 67.959 6.40466 68.9149 5.86587C69.8882 5.3097 71.0092 5.03161 72.278 5.03161C73.512 5.03161 74.5896 5.3097 75.5107 5.86587C76.4493 6.40466 77.1792 7.16071 77.7006 8.13401C78.222 9.10731 78.4828 10.2457 78.4828 11.5492V12.566H68.602C68.6368 13.6957 69.0105 14.5995 69.7231 15.2773C70.453 15.9378 71.3568 16.268 72.4344 16.268C73.4425 16.268 74.1985 16.0421 74.7025 15.5902C75.2239 15.1383 75.6237 14.6169 75.9018 14.0259L78.1178 15.173C77.8744 15.6597 77.5181 16.1724 77.0489 16.7112C76.597 17.25 75.9974 17.7019 75.25 18.0669C74.5027 18.4319 73.5467 18.6144 72.3822 18.6144ZM68.6281 10.5064H75.7454C75.6758 9.53312 75.3282 8.77708 74.7025 8.23829C74.0768 7.68212 73.26 7.40403 72.2519 7.40403C71.2438 7.40403 70.4183 7.68212 69.7752 8.23829C69.1495 8.77708 68.7671 9.53312 68.6281 10.5064Z" fill="black" />
                    <path d="M81.7151 18.2494V5.3966H84.3482V6.90869H84.7653C84.9739 6.3699 85.3041 5.97884 85.756 5.73552C86.2253 5.47481 86.7988 5.34446 87.4767 5.34446H89.0148V7.76902H87.3724C86.5034 7.76902 85.7908 8.01234 85.2346 8.49899C84.6784 8.96826 84.4004 9.69824 84.4004 10.6889V18.2494H81.7151Z" fill="black" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.53183 2.48588C10.3755 1.80886 11.6127 1.93848 12.2952 2.77539C13.4803 4.22852 14.5476 6.72617 14.2128 9.71426C13.8711 12.7647 12.1018 16.0594 8.08253 19.1242C4.69265 21.709 3.94145 23.8487 3.92993 25.2204C3.91781 26.663 4.71368 27.828 5.46233 28.4375C6.30117 29.1205 6.42308 30.3486 5.73463 31.1807C5.04617 32.0128 3.80806 32.1338 2.96922 31.4508C1.53393 30.2823 -0.0239974 28.0772 0.000280164 25.1879C0.0251538 22.2276 1.70056 19.0737 5.68755 16.0335C9.04513 13.4733 10.1069 11.0702 10.3071 9.28366C10.5143 7.43473 9.83446 5.95607 9.23997 5.22709C8.55747 4.39017 8.68814 3.16289 9.53183 2.48588ZM10.2219 23.3705C10.9121 22.5398 12.1504 22.4214 12.9879 23.106C14.6407 24.4572 16.5277 26.9955 17.0811 30.3775C17.648 33.8427 16.7779 37.9634 13.2733 42.314C12.5958 43.1549 11.3594 43.2919 10.5116 42.6199C9.66388 41.9479 9.5258 40.7214 10.2032 39.8805C13.1049 36.2784 13.5693 33.2467 13.202 31.002C12.8212 28.6741 11.5051 26.9452 10.4886 26.1143C9.65118 25.4297 9.53177 24.2012 10.2219 23.3705Z" fill="#F97316" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-8 lg:space-x-12 items-center">
              {

                pathname === '/restaurant-goer' ? <Link href="/" className="text-[#1E293B] text-center font-medium text-[16px] leading-[24px] font-jakarta hover:text-primary transition-colors duration-200">
                  For Restaurant
                </Link>
                  :
                  <Link href="/restaurant-goer" className="text-[#1E293B] text-center font-medium text-[16px] leading-[24px] font-jakarta hover:text-primary transition-colors duration-200">
                     Restaurant Goer
                  </Link>
              }
              <Link href="/refer-and-earn" className="text-[#1E293B] text-center font-medium text-[16px] leading-[24px] font-jakarta hover:text-primary transition-colors duration-200">
                Refer & Earn
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setCommunityOpen(true)}
                onMouseLeave={() => setCommunityOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-[#1E293B] font-medium text-[16px] leading-[24px] font-jakarta hover:text-primary transition-colors duration-200 cursor-pointer"
                  aria-expanded={communityOpen}
                  aria-haspopup="true"
                >
                  Community
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${communityOpen ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {communityOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-20">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-2 min-w-[180px] flex flex-col">
                      <Link
                        href="/blog"
                        className="px-4 py-3 rounded-lg text-[#1E293B] font-medium text-[14px] font-jakarta hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                      >
                        Blog
                      </Link>
                      <Link
                        href={faqHref}
                        className="px-4 py-3 rounded-lg text-[#1E293B] font-medium text-[14px] font-jakarta hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                      >
                        FAQ
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={['/','/restaurant'].includes(pathname) ? `${pathname}#join` : '/#join'}
                className="flex h-10 px-5 justify-center items-center rounded-xl bg-primary text-white font-medium text-[14px] font-jakarta hover:opacity-90 transition-opacity duration-200"
              >
                Join Us
              </Link>

            </div>


            {/* Mobile menu button */}
            <div className="sm:hidden">




              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <div
                  className={`relative flex flex-col h-5 w-5 justify-center items-center`}
                >
                  <div
                    className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1'
                      }`}
                  ></div>
                  <div
                    className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1'
                      }`}
                  ></div>
                </div>
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="mt-4 absolute top-12 pl-6 left-0 bg-white sm:hidden w-full pb-2  shadow-sm">
                <div className="pt-2 flex flex-col gap-4 ">
                  {/* <Link
              href="#"
            >
              For Restaurant Goer
            </Link> */}
                  {

                    pathname === '/restaurant-goer' ? <Link href="/"
                      className="block text-xl sm:text-base font-medium text-[#1E293B] hover:text-primary transition-colors duration-200"
                    >
                      For Restaurant
                    </Link>
                      :
                      <Link href="/restaurant-goer"
                        className="block text-xl sm:text-base font-medium text-[#1E293B] hover:text-primary transition-colors duration-200"
                      >
                         Restaurant Goer
                      </Link>
                  }
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href="/refer-and-earn"
                    className="block text-xl sm:text-base font-medium text-[#1E293B] hover:text-primary transition-colors duration-200"
                  >
                    Refer & Earn
                  </Link>
                  <div className="flex flex-col gap-3">
                    <span className="text-xl sm:text-base font-medium text-[#1E293B]">
                      Community
                    </span>
                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-100">
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        href="/blog"
                        className="block text-base font-medium text-[#557087] hover:text-primary transition-colors duration-200"
                      >
                        Blog
                      </Link>
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={faqHref}
                        className="block text-base font-medium text-[#557087] hover:text-primary transition-colors duration-200"
                      >
                        FAQ
                      </Link>
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={() => { setIsMenuOpen(false), router.push('/#join') }}
                      className="w-full max-w-[200px] h-12 capitalize bg-primary text-white font-medium rounded-xl text-[14px] font-jakarta hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                    >
                      Join Us
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
