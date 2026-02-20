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
                        tooltipText="Toggle FPS"
                        onClick={() => {
                            showToast(
                                "FPS setting toggled (UI only)",
                                Toasts.Type.SUCCESS
                            );
                        }}
                        icon={() => (
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M12 3C7 3 3 7 3 12s4 9 9 9-4 9-9 9z"
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
