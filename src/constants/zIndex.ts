/** 레이어 z-index 역순 선언 */
enum Layer {
  // Foruth
  // Thid
  Second = 1,
  First, // 2
}

export const zIndex = {
  BottomNav: Layer.First,
  CreateBtn: Layer.First,
  ToastBar: Layer.Second,
  Modal: Layer.First + 1,
};
