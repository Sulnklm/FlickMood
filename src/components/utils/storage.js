export const handleMovieClick = (movieId) => {
    const storedRecentlyViewed = localStorage.getItem("recentlyViewed");
    let recentlyViewed = storedRecentlyViewed
      ? JSON.parse(storedRecentlyViewed)
      : [];
  
    // 중복 제거 및 새로운 영화 추가
    recentlyViewed = recentlyViewed.filter((id) => id !== movieId);
    recentlyViewed.unshift(movieId); // 가장 최근 영화 맨 앞으로 추가
  
    // 최대 3개만 유지
    if (recentlyViewed.length > 3) {
      recentlyViewed = recentlyViewed.slice(0, 3);
    }
  
    // 로컬 스토리지 업데이트
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  };
  