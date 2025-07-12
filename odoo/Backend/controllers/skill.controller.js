// controllers/skill.controller.js

import { Skill } from "../models/Skill.model.js";
import { UserSkills } from "../models/UserSkills.model.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";

export const createUserSkillEntries = AsyncHandler(async (req, res) => {
    const { type, skills } = req.body;
    const userId = req.user._id;

    if (!["offered", "wanted"].includes(type)) {
        throw new ApiError(400, "Type must be 'offered' or 'wanted'");
    }

    if (!Array.isArray(skills) || skills.length === 0) {
        throw new ApiError(400, "Skills must be a non-empty array");
    }

    const skillIds = [];

    for (const skill of skills) {
        const { name, description } = skill;

        if (!name) continue;

        // Check if skill exists
        let existingSkill = await Skill.findOne({ name: name.toLowerCase().trim() });

        if (!existingSkill) {
            existingSkill = await Skill.create({
                name: name.toLowerCase().trim(),
                description,
                createdBy: userId,
            });
        }

        skillIds.push(existingSkill._id);
    }

    let userSkills = await UserSkills.findOne({ user: userId });

    if (!userSkills) {
        userSkills = await UserSkills.create({
            user: userId,
            offered: [],
            wanted: [],
        });
    }

    // Append to the appropriate array without duplication
    const currentSet = new Set(userSkills[type].map(id => id.toString()));
    for (const id of skillIds) {
        if (!currentSet.has(id.toString())) {
            userSkills[type].push(id);
        }
    }

    await userSkills.save();

    res.status(200).json({
        success: true,
        message: `Skills added to your ${type} list`,
        data: userSkills,
    });
});
