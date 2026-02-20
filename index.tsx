/// <reference types="vencord-types" />

import { React } from "@webpack/common";

const { showToast, Toasts } = Vencord.Webpack.Common;
const { findByPropsLazy } = Vencord.Webpack;

const PanelButton = findByPropsLazy("PanelButton");
const AccountDetails = findByPropsLazy("AccountDetails");

export default {
    name: "ScreenshareFpsButton",
    description: "Adds an FPS button next to mute/deafen (UI only).",

    start() {
        Vencord.Patcher.after(
            "ScreenshareFpsButton",
            AccountDetails,
            "default",
            (_, __, ret) => {
                if (!ret?.props?.children) return;

                ret.props.children.push(
                    <PanelButton
                        tooltipText="FPS Button"
                        onClick={() => {
                            showToast(
                                "FPS menu clicked (UI only)",
                                Toasts.Type.SUCCESS
                            );
                        }}
                        icon={() => (
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
                    />
                );
            }
        );
    },

    stop() {
        Vencord.Patcher.unpatchAll("ScreenshareFpsButton");
    }
};
