import { useState } from "react";
import { ParticipantGroupInput } from "@/types/participantGroup";

export default function useParticipantGroupsForm() {
    const [totalAmount, setTotalAmount] = useState("");
    const [participantGroups, setParticipantGroups] = useState<ParticipantGroupInput[]>([
        { position: "", weight: "", count: "" }
    ]);

    const addParticipantGroup = () => {
        setParticipantGroups(prev => [...prev, { position: "", weight: "", count: "" }]);
    };

    const removeParticipantGroup = (index: number) => {
        setParticipantGroups(prev => prev.filter((_, i) => i !== index));
    };

    const updateParticipantGroup = (
        index: number,
        field: keyof ParticipantGroupInput,
        value: string
    ) => {
        setParticipantGroups(prev =>
            prev.map((group, i) =>
                i === index
                    ? { ...group, [field]: value }
                    : group
            )
        );
    };

    const updatePosition = (index: number, position: string) => {
        updateParticipantGroup(index, "position", position);
    };

    const updateWeight = (index: number, weight: string) => {
        updateParticipantGroup(index, "weight", weight);
    };

    const updateCount = (index: number, count: string) => {
        updateParticipantGroup(index, "count", count);
    };

    return {
        totalAmount,
        setTotalAmount,
        participantGroups,
        updatePosition,
        updateWeight,
        updateCount,
        addParticipantGroup,
        removeParticipantGroup
    };
}
