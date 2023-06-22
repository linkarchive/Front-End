/** 레이어 z-index 역순 선언 */
enum Layer {
  // Foruth
  Third = 1,
  Second,
  First, // 3
}

export const zIndex = {
  BottomNav: Layer.First,
  CreateBtn: Layer.Third,
  ToastBar: Layer.Second,
  Modal: Layer.First + 1,
};
