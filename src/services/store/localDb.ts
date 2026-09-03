import { Mother } from "../../types/mother";
import { AshaWorker, AshaAction } from "../../types/asha";
import { CheckIn } from "../../types/checkIn";

const MOTHERS_KEY = "maamitra_mothers";
const ASHA_KEY = "maamitra_asha";
const CHECKINS_KEY = "maamitra_checkins";
const ACTIONS_KEY = "maamitra_actions";

const DEMO_ASHA: AshaWorker = {
  id: "asha-sunita-01",
  name: "Sunita Devi",
  area: "Shivapur",
  motherIds: ["m-01", "m-02", "m-03", "m-04", "m-05"],
};

const DEMO_MOTHERS: Mother[] = [
  {
    id: "m-01",
    name: "Priya Sharma",
    age: 24,
    status: "pregnant",
    gestationalWeeks: 26,
    language: "hi",
    ashaId: "asha-sunita-01",
    phone: "+91 98765 43210",
    location: { x: 30, y: 40, label: "Area A" },
  },
  {
    id: "m-02",
    name: "Anjali Verma",
    age: 22,
    status: "pregnant",
    gestationalWeeks: 31,
    language: "hi",
    ashaId: "asha-sunita-01",
    phone: "+91 98765 43211",
    location: { x: 60, y: 20, label: "Area B" },
  },
  {
    id: "m-03",
    name: "Kavita Singh",
    age: 26,
    status: "postpartum",
    postpartumDay: 12,
    language: "hi",
    ashaId: "asha-sunita-01",
    phone: "+91 98765 43212",
    location: { x: 80, y: 70, label: "Area C" },
  },
  {
    id: "m-04",
    name: "Meena Kumari",
    age: 21,
    status: "pregnant",
    gestationalWeeks: 20,
    language: "hi",
    ashaId: "asha-sunita-01",
    phone: "+91 98765 43213",
    location: { x: 20, y: 80, label: "Area D" },
  },
  {
    id: "m-05",
    name: "Sunita Kumari",
    age: 25,
    status: "postpartum",
    postpartumDay: 7,
    language: "hi",
    ashaId: "asha-sunita-01",
    phone: "+91 98765 43214",
    location: { x: 50, y: 60, label: "Area E" },
  }
];

function seedDB() {
  if (!localStorage.getItem(ASHA_KEY)) {
    localStorage.setItem(ASHA_KEY, JSON.stringify([DEMO_ASHA]));
  }
  if (!localStorage.getItem(MOTHERS_KEY)) {
    localStorage.setItem(MOTHERS_KEY, JSON.stringify(DEMO_MOTHERS));
  }
  const existingCheckIns = localStorage.getItem(CHECKINS_KEY);
  if (!existingCheckIns || JSON.parse(existingCheckIns).length === 0) {
    const demoCheckIns: CheckIn[] = [
      {
        id: "chk-01",
        motherId: "m-01",
        observations: [
          { id: "o1", type: "symptom", label: "??? ??????? (Severe headache)" },
          { id: "o2", type: "symptom", label: "???-????? ??? ???? (Swelling in hands/feet)" }
        ],
        status: "submitted",
        createdAt: new Date().toISOString(),
        priority: { level: "review", reason: "Severe headache and swelling reported — possible pre-eclampsia." }
      },
      {
        id: "chk-02",
        motherId: "m-02",
        observations: [{ id: "o3", type: "symptom", label: "????? ??? ???? (Mild stomach pain)" }],
        status: "submitted",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        priority: { level: "follow_up", reason: "Mild stomach pain reported." }
      },
      {
        id: "chk-03",
        motherId: "m-03",
        observations: [{ id: "o4", type: "other", label: "??????? ??? ??? (Feeling fine)" }],
        status: "submitted",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        priority: { level: "routine", reason: "No concerning observations." }
      }
    ];
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(demoCheckIns));
  }
  if (!localStorage.getItem(ACTIONS_KEY)) {
    localStorage.setItem(ACTIONS_KEY, JSON.stringify([]));
  }
}

// Call seed once on load
seedDB();

function triggerUpdate() {
  window.dispatchEvent(new Event("db-updated"));
}

export const db = {
  getAsha: (): AshaWorker | null => {
    const data = localStorage.getItem(ASHA_KEY);
    return data ? JSON.parse(data)[0] : null;
  },

  getMothers: (): Mother[] => {
    const data = localStorage.getItem(MOTHERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getMother: (id: string): Mother | null => {
    return db.getMothers().find((m) => m.id === id) || null;
  },

  getCheckIns: (motherId?: string): CheckIn[] => {
    const data = localStorage.getItem(CHECKINS_KEY);
    const checkIns: CheckIn[] = data ? JSON.parse(data) : [];
    if (motherId) {
      return checkIns.filter((c) => c.motherId === motherId);
    }
    return checkIns;
  },

  saveCheckIn: (checkIn: CheckIn) => {
    const checkIns = db.getCheckIns();
    checkIn.id = checkIn.id || "chk-" + Date.now();
    checkIns.push(checkIn);
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkIns));
    triggerUpdate();
  },

  getActions: (motherId?: string): AshaAction[] => {
    const data = localStorage.getItem(ACTIONS_KEY);
    const actions: AshaAction[] = data ? JSON.parse(data) : [];
    if (motherId) {
      return actions.filter((a) => a.motherId === motherId);
    }
    return actions;
  },

  saveAction: (action: Omit<AshaAction, "id" | "timestamp">) => {
    const actions = db.getActions();
    const newAction: AshaAction = {
      ...action,
      id: "act-" + Date.now(),
      timestamp: new Date().toISOString(),
    };
    actions.push(newAction);
    localStorage.setItem(ACTIONS_KEY, JSON.stringify(actions));
    triggerUpdate();
  },

  // Reset demo
  reset: () => {
    localStorage.removeItem(ASHA_KEY);
    localStorage.removeItem(MOTHERS_KEY);
    localStorage.removeItem(CHECKINS_KEY);
    localStorage.removeItem(ACTIONS_KEY);
    seedDB();
    triggerUpdate();
  }
};

