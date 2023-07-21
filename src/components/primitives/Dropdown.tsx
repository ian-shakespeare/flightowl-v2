import { createSignal, JSX } from "solid-js";

type Props = {
  id: string;
  dropButton: JSX.Element;
  children: JSX.Element;
  class?: string;
};

const Dropdown = ({
  id,
  dropButton,
  children,
  class: className = "",
}: Props) => {
  const [isExpanded, setIsExpanded] = createSignal(false);
  return (
    <>
      <button
        aria-controls={`${id}`}
        onClick={() => setIsExpanded(!isExpanded())}
        class={className}
      >
        {dropButton}
      </button>
      <div
        id={id}
        aria-expanded={isExpanded()}
        data-visible={isExpanded()}
        class="data-[visible=false]:hidden"
      >
        {children}
      </div>
    </>
  );
};

export default Dropdown;
