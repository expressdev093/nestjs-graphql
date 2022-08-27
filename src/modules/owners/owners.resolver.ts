import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from '../pets/pet.entity';
import { PetsService } from '../pets/pets.service';
import { Roles } from '../auth/metadata/roles.metadata';
import { Role } from '../auth/enums/role.enum';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly petsService: PetsService,
  ) {}

  @Roles(Role.Admin)
  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Roles(Role.Admin)
  @Query(() => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }

  @ResolveField((returns) => [Pet])
  async pets(@Parent() owner: Owner) {
    return this.petsService.getPets(owner.id);
  }
}
