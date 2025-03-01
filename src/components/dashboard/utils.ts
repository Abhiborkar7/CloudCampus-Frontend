export function openSidebar() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
  }
}

export function closeSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--SideNavigation-slideIn');
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}


export function openMessagesPane() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--MessagesPane-slideIn', '1');
  }
}

export function closeMessagesPane() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--MessagesPane-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleMessagesPane() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--MessagesPane-slideIn');
    if (slideIn) {
      closeMessagesPane();
    } else {
      openMessagesPane();
    }
  }
}




export function openComplainPane() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--ComplainPane-slideIn', '1');
  }
}

export function closeComplainPane() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--ComplainPane-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleComplainPane() {
  console.log("dsdasdasd")
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--ComplainPane-slideIn');
    if (slideIn) {
      closeComplainPane();
    } else {
      openComplainPane();
    }
  }
}






export function openEmailContent() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--EmailContent-slideIn', '1');
  }
}

export function closeEmailContent() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--EmailContent-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleEmailContent() {
  console.log("dsdasdasd")
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--EmailContent-slideIn');
    if (slideIn) {
      closeEmailContent();
    } else {
      openEmailContent();
    }
  }
}