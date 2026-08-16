import { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Heart, Share2, Bookmark, Bell, Trash2 } from "lucide-react";

const TooltipPage = () => {
  // Playground interactive state
  const [position, setPosition] = useState<"top" | "bottom" | "left" | "right">("left");
  const [variant, setVariant] = useState<"dark" | "light" | "primary" | "destructive" | "outline">("destructive");
  const [trigger, setTrigger] = useState<"hover" | "click" | "focus">("click");
  const [showArrow, setShowArrow] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [forceOpen, setForceOpen] = useState(true);

  // Interactive tooltip state actions
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [actionLog, setActionLog] = useState<string>("No action triggered yet.");
  const [notificationCount, setNotificationCount] = useState(3);

  const playgroundCode = `<Tooltip
  position="${position}"
  variant="${variant}"
  trigger="${trigger}"
  showArrow={${showArrow}}
  interactive={${interactive}}
  content="This is a fully customizable tooltip!"
>
  <Button variant="primary">Hover / Click Me</Button>
</Tooltip>`;

  const interactiveTooltipCode = `const [liked, setLiked] = useState(false);

<Tooltip
  position="top"
  variant="light"
  trigger="click"
  interactive={true}
  content={
    <div className="flex items-center gap-2 p-1">
      <button 
        onClick={() => setLiked(!liked)} 
        className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded text-xs font-semibold flex items-center gap-1"
      >
        <Heart size={14} fill={liked ? "currentColor" : "none"} />
        {liked ? "Liked!" : "Like"}
      </button>
      <button 
        onClick={() => alert("Shared!")} 
        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-semibold flex items-center gap-1"
      >
        <Share2 size={14} /> Share
      </button>
    </div>
  }
>
  <Button variant="outline">Interactive Card Options</Button>
</Tooltip>`;

  const positionsCode = `<Tooltip position="top" content="Top Tooltip">
  <Button variant="outline">Top</Button>
</Tooltip>
<Tooltip position="bottom" content="Bottom Tooltip">
  <Button variant="outline">Bottom</Button>
</Tooltip>
<Tooltip position="left" content="Left Tooltip">
  <Button variant="outline">Left</Button>
</Tooltip>
<Tooltip position="right" content="Right Tooltip">
  <Button variant="outline">Right</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode",
      default: "-",
      description: "The content to display inside the tooltip (string, JSX, or interactive elements).",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Position of the tooltip relative to the trigger element.",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "primary" | "destructive" | "outline"',
      default: '"dark"',
      description: "Visual styling variant of the tooltip overlay.",
    },
    {
      prop: "trigger",
      type: '"hover" | "click" | "focus"',
      default: '"hover"',
      description: "Event trigger that opens and closes the tooltip.",
    },
    {
      prop: "showArrow",
      type: "boolean",
      default: "true",
      description: "Whether to render a pointing directional arrow on the tooltip.",
    },
    {
      prop: "interactive",
      type: "boolean",
      default: "false",
      description: "When true, allows user pointer interaction inside tooltip content without closing.",
    },
    {
      prop: "delay",
      type: "number",
      default: "150",
      description: "Delay in milliseconds before showing or hiding hover tooltips.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables tooltip from displaying when triggered.",
    },
    {
      prop: "open",
      type: "boolean",
      default: "undefined",
      description: "Controlled visibility state of the tooltip.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      default: "-",
      description: "Callback triggered when tooltip visibility changes.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tooltip
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          A customizable popover component that displays informative, interactive content when hovering, clicking, or focusing an element.
        </p>
      </header>

      {/* Interactive Playground / Control Panel */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Interactive Playground
        </h2>
        <div className="p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {/* Position picker */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-slate-400 mb-1">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full p-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>

            {/* Variant picker */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-slate-400 mb-1">
                Variant
              </label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as any)}
                className="w-full p-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="primary">Primary</option>
                <option value="destructive">Destructive</option>
                <option value="outline">Outline</option>
              </select>
            </div>

            {/* Trigger picker */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-slate-400 mb-1">
                Trigger
              </label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value as any)}
                className="w-full p-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              >
                <option value="hover">Hover</option>
                <option value="click">Click</option>
                <option value="focus">Focus</option>
              </select>
            </div>

            {/* Options Toggles */}
            <div className="flex flex-col justify-end space-y-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showArrow}
                  onChange={(e) => setShowArrow(e.target.checked)}
                  className="rounded border-gray-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                Show Arrow
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={interactive}
                  onChange={(e) => setInteractive(e.target.checked)}
                  className="rounded border-gray-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                Interactive Content
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <input
                  type="checkbox"
                  checked={forceOpen}
                  onChange={(e) => setForceOpen(e.target.checked)}
                  className="rounded border-indigo-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                Keep Open Preview
              </label>
            </div>
          </div>
        </div>

        <ComponentDemo code={playgroundCode} overflowVisible={true}>
          <div className="py-20 px-24 flex flex-col items-center justify-center min-h-[180px]">
            <Tooltip
              key={`${position}-${variant}-${trigger}-${showArrow}-${interactive}-${forceOpen}`}
              position={position}
              variant={variant}
              trigger={trigger}
              showArrow={showArrow}
              interactive={interactive}
              forceOpen={forceOpen}
              content={
                interactive ? (
                  <div className="flex items-center gap-2 py-0.5">
                    <span>Interactive Tooltip!</span>
                    <button
                      onClick={() => setActionLog("Clicked button inside Playground Tooltip!")}
                      className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded text-xs font-bold"
                    >
                      Click Me
                    </button>
                  </div>
                ) : (
                  `Tooltip on ${position} (${variant})`
                )
              }
            >
              <Button variant="primary" size="lg">
                {trigger === "click"
                  ? "Click Me to Toggle Tooltip"
                  : trigger === "focus"
                  ? "Tab / Focus Me"
                  : "Hover Over Me"}
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* Fully Functional & Clickable Tooltip Options Showcase */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Fully Functional Clickable Tooltip Options
        </h2>
        <p className="text-gray-600 dark:text-slate-400">
          Tooltips can contain fully functional interactive elements, dropdown action buttons, and control options that respond to user clicks in real time.
        </p>

        <ComponentDemo code={interactiveTooltipCode} overflowVisible={true}>
          <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto py-8">
            <div className="flex flex-wrap justify-center gap-4">
              {/* Option 1: Like & Share Actions */}
              <Tooltip
                position="top"
                variant="light"
                trigger="click"
                interactive={true}
                content={
                  <div className="flex items-center gap-2 p-1">
                    <button
                      onClick={() => {
                        const newStatus = !liked;
                        setLiked(newStatus);
                        setActionLog(newStatus ? "Liked item!" : "Unliked item.");
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        liked ? "bg-red-50 text-red-600 border border-red-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Heart size={14} className={liked ? "fill-red-500 text-red-500" : ""} />
                      {liked ? "Liked" : "Like"}
                    </button>

                    <button
                      onClick={() => {
                        const newStatus = !bookmarked;
                        setBookmarked(newStatus);
                        setActionLog(newStatus ? "Saved to Bookmarks!" : "Removed from Bookmarks.");
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        bookmarked ? "bg-indigo-50 text-indigo-600 border border-indigo-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Bookmark size={14} className={bookmarked ? "fill-indigo-600 text-indigo-600" : ""} />
                      {bookmarked ? "Saved" : "Save"}
                    </button>
                  </div>
                }
              >
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 size={16} /> Quick Actions
                </Button>
              </Tooltip>

              {/* Option 2: Notifications Dropdown / Counter */}
              <Tooltip
                position="top"
                variant="dark"
                trigger="click"
                interactive={true}
                content={
                  <div className="space-y-2 p-1 min-w-[180px]">
                    <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-700">
                      <span className="font-semibold text-slate-300">Notifications</span>
                      <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">
                        {notificationCount} New
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">You have unread system updates.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setNotificationCount(0);
                          setActionLog("All notifications marked as read.");
                        }}
                        className="w-full py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium transition"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                }
              >
                <Button variant="dark" size="sm" className="flex items-center gap-2 relative">
                  <Bell size={16} /> Notifications
                  {notificationCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </Tooltip>

              {/* Option 3: Delete Confirmation */}
              <Tooltip
                position="top"
                variant="destructive"
                trigger="click"
                interactive={true}
                content={
                  <div className="flex items-center gap-2 p-1">
                    <span className="text-xs font-semibold">Confirm Delete?</span>
                    <button
                      onClick={() => setActionLog("Item deleted permanently!")}
                      className="px-2 py-0.5 bg-white text-red-600 hover:bg-red-50 rounded text-xs font-bold transition"
                    >
                      Yes, Delete
                    </button>
                  </div>
                }
              >
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <Trash2 size={16} /> Delete
                </Button>
              </Tooltip>
            </div>

            {/* Live Action Log Box */}
            <div className="w-full p-3 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md text-xs font-mono text-gray-700 dark:text-slate-300 flex items-center justify-between">
              <span>Status Output:</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{actionLog}</span>
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* Placement Positions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Positions
        </h2>
        <p className="text-gray-600 dark:text-slate-400">
          Tooltips can be positioned on top, bottom, left, or right of the target component.
        </p>

        <ComponentDemo code={positionsCode} overflowVisible={true}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 py-16">
            <Tooltip forceOpen={true} position="top" content="Tooltip on Top">
              <Button variant="outline" size="sm" className="w-full">Top</Button>
            </Tooltip>
            <Tooltip forceOpen={true} position="bottom" content="Tooltip on Bottom">
              <Button variant="outline" size="sm" className="w-full">Bottom</Button>
            </Tooltip>
            <Tooltip forceOpen={true} position="left" content="Tooltip on Left">
              <Button variant="outline" size="sm" className="w-full">Left</Button>
            </Tooltip>
            <Tooltip forceOpen={true} position="right" content="Tooltip on Right">
              <Button variant="outline" size="sm" className="w-full">Right</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* Visual Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Visual Variants
        </h2>
        <ComponentDemo
          overflowVisible={true}
          code={`<Tooltip variant="dark" content="Dark theme">...</Tooltip>
<Tooltip variant="light" content="Light theme">...</Tooltip>
<Tooltip variant="primary" content="Primary accent">...</Tooltip>
<Tooltip variant="destructive" content="Destructive warning">...</Tooltip>
<Tooltip variant="outline" content="Outline glassmorphism">...</Tooltip>`}
        >
          <div className="flex flex-wrap justify-center gap-6 p-8 py-16">
            <Tooltip forceOpen={true} variant="dark" content="Dark Theme Tooltip">
              <Button variant="dark" size="sm">Dark</Button>
            </Tooltip>
            <Tooltip forceOpen={true} variant="light" content="Light Theme Tooltip">
              <Button variant="ghost" size="sm" className="border border-gray-300">Light</Button>
            </Tooltip>
            <Tooltip forceOpen={true} variant="primary" content="Primary Indigo Theme">
              <Button variant="primary" size="sm">Primary</Button>
            </Tooltip>
            <Tooltip forceOpen={true} variant="destructive" content="Destructive Red Tooltip">
              <Button variant="destructive" size="sm">Destructive</Button>
            </Tooltip>
            <Tooltip forceOpen={true} variant="outline" content="Outline Backdrop Blur">
              <Button variant="outline" size="sm">Outline</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          API Reference
        </h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;
