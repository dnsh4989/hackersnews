import { createAction, props } from "@ngrx/store";

export const changeStatus = createAction(
    '[Loading] Change Loading Status',
    props<{isLoading: boolean}>()
);