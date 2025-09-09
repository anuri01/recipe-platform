import { create } from "zustand";

//레이어오픈 전역 스토어 

const useLayerStore = create((set) => ({
   isLayerOpen: false,
//    screenScrollRock: false,

    openLayer: () => {
    set({isLayerOpen: true})
   },
   
    closeLayer: () => {
        set({isLayerOpen: false})
    }

   }
));

export default useLayerStore;